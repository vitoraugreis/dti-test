namespace server.Models;

public class PetShop
{
    public string Nome { get; set; }
    public decimal Distancia { get; set; }
    public decimal CustoDiaUtilPequeno { get; set; }
    public decimal CustoDiaUtilGrande { get; set; }
    public decimal? AumentoFimDeSemanaPercentual { get; set; }
    public decimal? CustoFimDeSemanaPequeno { get; set; }
    public decimal? CustoFimDeSemanaGrande { get; set; }

    public PetShop(string nome, decimal distancia, decimal custoDiaUtilPequeno,
                    decimal custoDiaUtilGrande, decimal? aumentoFimDeSemanaPercentual = null,
                    decimal? custoFimDeSemanaPequeno = null, decimal? custoFimDeSemanaGrande = null)
    {
        Nome = nome;
        Distancia = distancia;
        CustoDiaUtilPequeno = custoDiaUtilPequeno;
        CustoDiaUtilGrande = custoDiaUtilGrande;
        AumentoFimDeSemanaPercentual = aumentoFimDeSemanaPercentual;
        CustoFimDeSemanaPequeno = custoFimDeSemanaPequeno;
        CustoFimDeSemanaGrande = custoFimDeSemanaGrande;
    }

    public decimal CalcularCusto(DateTime data, int qntdPequeno, int qntdGrande)
    {
        bool ehFimDeSemana = data.DayOfWeek == DayOfWeek.Saturday
                            || data.DayOfWeek == DayOfWeek.Sunday;
        if (!ehFimDeSemana)
            return (qntdPequeno * CustoDiaUtilPequeno) + (qntdGrande * CustoDiaUtilGrande);

        if (AumentoFimDeSemanaPercentual.HasValue)
        {
            decimal custoBase = (qntdPequeno * CustoDiaUtilPequeno) + (qntdGrande * CustoDiaUtilGrande);
            return custoBase * (1 + AumentoFimDeSemanaPercentual.Value / 100);
        }

        if (CustoFimDeSemanaPequeno.HasValue && CustoFimDeSemanaGrande.HasValue)
            return (qntdPequeno * CustoFimDeSemanaPequeno.Value) + (qntdGrande * CustoFimDeSemanaGrande.Value);
        
        return (qntdPequeno * CustoDiaUtilPequeno) + (qntdGrande * CustoDiaUtilGrande);
    }
}