using Microsoft.AspNetCore.Mvc;
using server.Models;

var builder = WebApplication.CreateBuilder(args);

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "CanilAPI";
    config.Title = "CanilAPI v1";
    config.Version = "v1";
});


var petshops = new List<PetShop>
{
    new PetShop(
        nome: "Meu Canino Feliz",
        distancia: 2.0m,
        custoDiaUtilPequeno: 20,
        custoDiaUtilGrande: 40,
        aumentoFimDeSemanaPercentual: 20
    ),
    new PetShop(
        nome: "Vai Rex",
        distancia: 1.7m,
        custoDiaUtilPequeno: 15,
        custoDiaUtilGrande: 50,
        custoFimDeSemanaPequeno: 20,
        custoFimDeSemanaGrande: 55
    ),
    new PetShop(
        nome: "ChowChawgas",
        distancia: 0.8m,
        custoDiaUtilPequeno: 30,
        custoDiaUtilGrande: 45
    )
};
builder.Services.AddSingleton(petshops);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi(config =>
    {
        config.DocumentTitle = "CanilAPI";
        config.Path = "/swagger";
        config.DocumentPath = "/swagger/{documentName}/swagger.json";
        config.DocExpansion = "list";
    });
}

app.MapPost("/api/calculo", ([FromBody] DataDto dados, [FromServices] List<PetShop> petshopsList) =>
{
    if (dados.QntdCaesPequenos < 0 || dados.QntdCaesGrandes < 0)
        return Results.BadRequest("A quantidade de cães não pode ser negativa.");

    var resultados = petshopsList.Select(petshop => new
    {
        NomePetshop = petshop.Nome,
        DistanciaPetshop = petshop.Distancia,
        CustoTotalPetshop = petshop.CalcularCusto(dados.Data, dados.QntdCaesPequenos, dados.QntdCaesGrandes)
    });

    var melhorPetshop = resultados.OrderBy(r => r.CustoTotalPetshop)
                                    .ThenBy(r => r.DistanciaPetshop)
                                    .FirstOrDefault();

    if (melhorPetshop == null)
        return Results.NotFound("Não foi possível encontrar um petshop.");

    return Results.Ok(melhorPetshop);
});

app.Run();
