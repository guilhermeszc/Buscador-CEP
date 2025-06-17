// Importa o hook useState para manipular estados no React
import { useState } from "react";

// Importa o arquivo de estilos CSS externo
import "./App.css";

// Importa o ícone de lupa da biblioteca react-icons
import { FaSearch } from "react-icons/fa";

// Importa uma instância personalizada do Axios configurada para a API do ViaCEP
import api from "./services/api";

// Componente principal do app
function App() {
  // Estado para armazenar o que o usuário digita
  const [input, setInput] = useState("");

  // Estado para armazenar os dados do CEP retornado pela API
  const [cep, setCep] = useState({});

  // Função chamada quando o botão de busca é clicado
  async function handleSearch() {
    if (input === "") {
      alert("Preencha com CEP"); // Alerta se o campo estiver vazio
      return;
    }

    try {
      // Faz uma requisição GET para a API do ViaCEP
      const response = await api.get(`${input}/json`);

      // Salva a resposta no estado 'cep'
      setCep(response.data);

      // ⚠️ Correção: Aqui deve ser setInput("") para limpar o campo após busca
      setInput("");
    } catch {
      alert("CEP não encontrado"); // Alerta em caso de erro
      setInput(""); // Limpa o campo input
    }
  }

  return (
    <>
      <div className="container">
        {/* Título principal */}
        <h1 className="title">Buscador de CEP</h1>

        {/* Campo de entrada e botão */}
        <div className="containerinput">
          <input
            type="text"
            placeholder="Digite seu CEP..."
            value={input}
            onChange={(e) => setInput(e.target.value)} // Atualiza o estado conforme digita
          />

          {/* Botão com ícone de lupa */}
          <button className="buttonSearch" onClick={handleSearch}>
            <FaSearch size={18} color="black" />
          </button>
        </div>

        {/* Exibe os dados do CEP somente se tiver conteúdo */}
        {Object.keys(cep).length > 0 && (
          <main className="main">
            <h2>CEP: {cep.cep}</h2>
            <span>Endereço: {cep.logradouro}</span>
            <span>{cep.complemento}</span>
            <span>Bairro: {cep.bairro}</span>
            <span>
              Cidade: {cep.localidade} - {cep.uf}
            </span>
          </main>
        )}
      </div>
    </>
  );
}

export default App; // Exporta o componente App
