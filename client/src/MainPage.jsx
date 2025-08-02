import { useState } from "react";

function MainPage() {
    const [dataConsulta, setDataConsulta] = useState(new Date().toISOString().split('T')[0]);
    const [qntdCaesPequenos, setQntdCaesPequenos] = useState('');
    const [qntdCaesGrandes, setQntdCaesGrandes] = useState('');

    const [melhorPetshop, setMelhorPetshop] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const formSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMelhorPetshop(null);

        const dadosConsulta = {
            data: dataConsulta,
            qntdCaesPequenos: Number(qntdCaesPequenos),
            qntdCaesGrandes: Number(qntdCaesGrandes)
        };

        try {
            const response = await fetch("http://localhost:5000/api/calculo", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dadosConsulta), 
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || "Ocorreu um erro no servidor.");
            }

            const resultado = await response.json();
            setMelhorPetshop(resultado);
            
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Calculadora de Melhor Petshop</h1>
            <form onSubmit={formSubmit}>
                <div>
                    <label>Insira a data do banho:</label>
                    <input
                        type="date"
                        value={dataConsulta}
                        onChange={e => setDataConsulta(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Quantidade de cães de raça pequena:</label>
                    <input
                        type="number"
                        min="0"
                        value={qntdCaesPequenos}
                        onChange={e => setQntdCaesPequenos(e.target.value)}
                        placeholder="Ex: 2"
                        required
                    />
                </div>
                <div>
                    <label>Quantidade de cães de raça grande:</label>
                    <input
                        type="number"
                        min="0"
                        value={qntdCaesGrandes}
                        onChange={e => setQntdCaesGrandes(e.target.value)}
                        placeholder="Ex: 1"
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Buscando...' : 'Fazer consulta'}
                </button>
            </form>
            <hr />
            
            {error && <p style={{color: 'red'}}>Erro: {error}</p>}

            {melhorPetshop && (
                <div style={{marginTop: '20px', border: '1px solid #4CAF50', padding: '15px', borderRadius: '5px'}}>
                    <h3>🏆 Melhor Opção Encontrada:</h3>
                    <p><strong>Petshop:</strong> {melhorPetshop.nomePetshop}</p>
                    <p><strong>Custo Total:</strong> {melhorPetshop.custoTotalPetshop.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>
            )}
        </div>
    );
}

export default MainPage;