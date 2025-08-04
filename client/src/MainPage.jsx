import { useState } from "react";
import {
    ThemeProvider,
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    Card,
    CardContent,
    createTheme
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import styled, { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  html, body, #root {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
`;

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 60% 1fr; 
  width: 100%;
  height: 100vh;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const BackgroundImageContainer = styled.div`
  background-image: url('/background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  @media (max-width: 900px) {
    display: none;
  }
`;

const ContentContainer = styled.div`
  padding: 40px;
  overflow-y: auto;
  background-color: #95b9d6;
`;


function MainPage() {
    const [dataConsulta, setDataConsulta] = useState(new Date());
    const [qntdCaesPequenos, setQntdCaesPequenos] = useState('');
    const [qntdCaesGrandes, setQntdCaesGrandes] = useState('');
    const [melhorPetshop, setMelhorPetshop] = useState(null);
    const [error, setError] = useState(null);

    // Função para lançar a consulta ao backend e receber o resultado (ou um erro).
    const formSubmit = async (e) => {
        e.preventDefault();
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
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <PageContainer>
                <BackgroundImageContainer />
                <ContentContainer>
                    <Typography variant="h4" component="h1" align="center" gutterBottom>
                        Calculadora de Melhor Petshop
                    </Typography>

                    <Box component="form" onSubmit={formSubmit} noValidate sx={{ mb: 4 }}>
                        <Stack spacing={3}>
                            <Stack direction="row" spacing={2}>
                                <TextField fullWidth type="number" label="Cães Pequenos" value={qntdCaesPequenos} onChange={e => setQntdCaesPequenos(e.target.value)} />
                                <TextField fullWidth type="number" label="Cães Grandes" value={qntdCaesGrandes} onChange={e => setQntdCaesGrandes(e.target.value)} />
                            </Stack>
                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                                <DatePicker label="Data do Banho" value={dataConsulta} onChange={(novaData) => setDataConsulta(novaData)} />
                            </LocalizationProvider>
                            <Button type="submit" variant="contained" size="large"> Fazer Consulta </Button>
                        </Stack>
                    </Box>

                    {error && (
                        <Typography color="error" align="center">
                            Erro: {error}
                        </Typography>
                    )}
                    {melhorPetshop && (
                        <Card variant="outlined" sx={{ bgcolor: '#f1f8e9' }}>
                            <CardContent>
                                <Typography variant="h6" component="h3" gutterBottom>
                                    🏆 Melhor Opção Encontrada:
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Petshop:</strong> {melhorPetshop.nomePetshop}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Distância:</strong> {melhorPetshop.distanciaPetshop} km
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Custo Total:</strong> {melhorPetshop.custoTotalPetshop.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </Typography>
                            </CardContent>
                        </Card>
                    )}
                </ContentContainer>
            </PageContainer>
        </ThemeProvider>
    );
}

export default MainPage;