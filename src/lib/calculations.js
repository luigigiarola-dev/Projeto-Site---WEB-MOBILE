/**
 * Taxas de fallback caso a API ainda esteja carregando
 */
const DEFAULT_RATES = {
  cdiMonthly: 0.009,
  savingsMonthly: 0.005,
};

/**
 * Formata um valor numérico para o padrão de moeda brasileiro (BRL).
 */
export function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value) || 0);
}

/**
 * Formata data ISO (YYYY-MM-DD) para formato legível brasileiro.
 */
export function formatDate(isoDateString) {
  if (!isoDateString) return "Sem data definida";
  try {
    return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(
      new Date(isoDateString + "T12:00:00")
    );
  } catch {
    return isoDateString;
  }
}

/**
 * Fórmula de Juros Compostos com Aportes Mensais:
 * FV = P * (1 + r)^n + PMT * [((1 + r)^n - 1) / r]
 */
export function calculateFutureValue(principal, monthlyPayment, monthlyRate, months) {
  if (months <= 0) return principal;
  if (Math.abs(monthlyRate) < 1e-10) {
    return principal + monthlyPayment * months;
  }
  const compoundFactor = Math.pow(1 + monthlyRate, months);
  return principal * compoundFactor + monthlyPayment * ((compoundFactor - 1) / monthlyRate);
}

/**
 * Executa a simulação completa para o simulador de investimentos.
 * Aceita as taxas de mercado obtidas via API (ou usa os valores padrão).
 */
export function calculateSimulation(
  { initial = 1000, monthly = 300, annualRate = 11.5, years = 5 },
  rates = DEFAULT_RATES
) {
  const activeRates = rates || DEFAULT_RATES;
  const initVal = Number(initial) || 0;
  const monthVal = Number(monthly) || 0;
  const rateVal = Number(annualRate) || 0;
  const yearsVal = Math.max(0.1, Number(years) || 1);

  const totalMonths = Math.max(1, Math.round(yearsVal * 12));
  // Taxa mensal equivalente: r = (1 + i)^(1/12) - 1
  const monthlyRate = rateVal > -100 ? Math.pow(1 + rateVal / 100, 1 / 12) - 1 : 0;

  const dataPoints = [];
  const steps = Math.min(60, totalMonths);

  const cdiMonthly = activeRates.cdiMonthly ?? DEFAULT_RATES.cdiMonthly;
  const savingsMonthly = activeRates.savingsMonthly ?? DEFAULT_RATES.savingsMonthly;

  for (let i = 0; i <= steps; i++) {
    const month = (totalMonths * i) / steps;
    dataPoints.push({
      month,
      userValue: calculateFutureValue(initVal, monthVal, monthlyRate, month),
      cdiValue: calculateFutureValue(initVal, monthVal, cdiMonthly, month),
      savingsValue: calculateFutureValue(initVal, monthVal, savingsMonthly, month),
    });
  }

  const finalAmount = dataPoints[dataPoints.length - 1].userValue;
  const totalInvested = initVal + monthVal * totalMonths;
  const totalProfit = Math.max(0, finalAmount - totalInvested);

  return {
    initial: initVal,
    monthly: monthVal,
    annualRate: rateVal,
    years: yearsVal,
    monthlyRate,
    totalMonths,
    finalAmount,
    totalInvested,
    totalProfit,
    dataPoints,
  };
}

/**
 * Calcula a porcentagem de progresso do usuário.
 */
export function getProgressPercentage(completedCount, totalModules = 6) {
  if (!totalModules) return 0;
  return Math.min(100, Math.round((completedCount / totalModules) * 100));
}

/**
 * Retorna o nível de conhecimento do usuário com base no progresso.
 */
export function getUserLevel(completedCount, totalModules = 6) {
  const progress = getProgressPercentage(completedCount, totalModules);
  if (progress >= 70) return "Avançado";
  if (progress >= 35) return "Intermediário";
  if (progress > 0) return "Iniciante";
  return "Novato";
}
