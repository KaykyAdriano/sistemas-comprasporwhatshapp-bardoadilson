


window.onload = function(){
    atualizarBadge()
}
function atualizarBadge(){
// essa linha vai buscar o carrinho na memoria
let carrinho = JSON.parse(localStorage.getItem('meuCarrinho')) || []

// essa linha soma as quantidades
let totalItens = 0
carrinho.forEach(item => {
    totalItens +=item.quantidade;
})
//essa linha procura o contadaor encima do carrinho
let badge = document.getElementById('contagem-carrinho')
if (badge){
    badge.innerText = totalItens;
}
}


function aumentar(){
    let input=document.getElementById('quantidade')
        input.value=parseInt(input.value) +1
    }


function diminuir(){
    let input=document.getElementById('quantidade')
        input.value=parseInt(input.value) -1
   }


// a função abrir detalhes funciona com uma bandeja invisivel no HTML ou seja criei essa função
// Ou seja a função recebe os dados do produto clicado, preenche aquele modal que criamos e o exibe na tela ela começa a funcionar a partir do momento que o cliente clica no card do produto


function abrirDetalhes(id, nome, preco,descricao, imagem, sabores = null) {
    //documet.getelementbyid para pegar o id,nome, e descrição feita no HTML
    document.getElementById('modal-nome').innerText = nome
    document.getElementById('modal-desc').innerText = descricao
    document.getElementById('modal-preco').innerText = "R$ " + preco.toFixed(2).replace('.', ',')
    document.getElementById('modal-img').src= imagem
    document.getElementById('modal-id-produto').value = id
    document.getElementById('modal-preco-real').value = preco
    document.getElementById('quantidade').value = 1

    // Abaixo e a logica caso precise de adicionar mais sabores
    let areaSabores = document.getElementById('area-sabores')
    let select = document.getElementById('selecao-sabor')

    if (sabores) {
        // Se tiver sabores, mostra a caixa e cria as opções
        areaSabores.style.display = 'block'
        select.innerHTML = '' // Limpa opções antigas
        
        // Transforma o texto "Uva,Manga" em uma lista ["Uva", "Manga"]
        let listaSabores = sabores.split(',');
        
        listaSabores.forEach(sabor => {
            let option = document.createElement('option');
            option.value = sabor.trim() // trim tira espaços em branco extras
            option.innerText = sabor.trim()
            select.appendChild(option)
        });
    } else {
        // Se não tiver sabores (cerveja), esconde a caixa
        areaSabores.style.display = 'none';
    }

    document.getElementById('modal-produto').style.display = 'flex'
}

/* --- ATUALIZADA: Agora pega o sabor escolhido --- */
function adicionarAoCarrinhoDinamico() {
    let id = document.getElementById('modal-id-produto').value
    let nome = document.getElementById('modal-nome').innerText
    let preco = parseFloat(document.getElementById('modal-preco-real').value)
    let imagem = document.getElementById('modal-img').getAttribute('src')
    let qtd = parseInt(document.getElementById('quantidade').value)
    let areaSabores = document.getElementById('area-sabores')
    if (areaSabores.style.display !== 'none') {
        let saborEscolhido = document.getElementById('selecao-sabor').value
        // Muda o nome para "Suco Del Valle - Uva"

    nome = nome + " - " + saborEscolhido; 
    id = id + "-" + saborEscolhido; 
    }

    const produto = {
        id: id,
        nome: nome,
        preco: preco,
        imagem: imagem,
        quantidade: qtd,
    }
    // ultilizei uma variavel carrinho junto com o JSON.pase e LocalStorage para sempre ler o carrinho atual
    let carrinho = JSON.parse(localStorage.getItem('meuCarrinho')) || []
    let itemExistente = carrinho.find(item => item.id === id)

    if (itemExistente) {
        itemExistente.quantidade += qtd
    } else {
        carrinho.push(produto)
    }

    localStorage.setItem('meuCarrinho', JSON.stringify(carrinho))

    window.location.href = "carrinho.html";
}


function fecharModalProduto(){
    document.getElementById('modal-produto').style.display='none'
}



window.onload = function() { renderizarCarrinho(); }


// Função do Carrinho 
        function renderizarCarrinho() { // para tudo funcionar perfeitamente a linha 119 esta interligada usando o return na linha 123


            let carrinho = JSON.parse(localStorage.getItem('meuCarrinho')) || []
            let container = document.getElementById('lista-carrinho')

            if(!container) {return}

            let total = 0;

            if (carrinho.length === 0) {
                container.innerHTML = '<div class="carrinho-vazio">Seu carrinho está vazio 😢</div>'
                document.getElementById('valor-total').innerText = 'R$ 0,00';// essa linha e ativa quando o cliente clica no X ou em LIMPAR dentro da função renderizar carrainho
                                                                             // Quando você clica no "X": A função removerItem tira um produto e chama o renderizarCarrinho
                return 
            }

            container.innerHTML = ''
            
            carrinho.forEach((item, index) => {
                let subtotal = item.preco * item.quantidade
                total += subtotal

                container.innerHTML += `
                    <div class="item-carrinho">
                        <div class="info-item">
                            <strong>${item.quantidade}x ${item.nome}</strong>
                            <span>R$ ${item.preco.toFixed(2)}</span>
                        </div>
                        <div class="preco-item">R$ ${subtotal.toFixed(2)}</div>
                        <button class="btn-remove-item" onclick="removerItem(${index})">X</button>
                    </div>`
            });
            document.getElementById('valor-total').innerText = 'R$ ' + total.toFixed(2).replace('.', ',')
        }

        

    function abrirModal(){
        let carrinho = JSON.parse(localStorage.getItem('meuCarrinho')) || []
        if (carrinho.length === 0) 
            { alert("Carrinho vazio!"); return }
let dados = JSON.parse(localStorage.getItem('dadosCliente'))
if (dados){
    document.getElementById('cliente-nome').value = dados.nome
    document.getElementById(' cliente-telefone').value =dados.telefone
}
// e essas linhas abaixo garante que comece a etapa 1 que e a de indetificação 
document.getElementById('etapa-identificacao').style.display = 'block'
document.getElementById('etapa-pagamento').style.display = 'none'
document.getElementById('modal-identificacao').style.display ='flex'
}

function irParaPagamento(){
    let nome = document.getElementById('cliente-nome').value;
    let telefone = document.getElementById('cliente-telefone').value

    if(nome === "" || telefone === ""){
        alert('Preencha nome e telefone antes de continuar !')
        return
    }
  // essa linha esconde o formulario de identificação  e mostra a etapa 2 que e a de pagamento 
document.getElementById('etapa-identificacao').style.display='none'
document.getElementById('etapa-pagamento').style.display = 'block'  
}

function voltarParaIdentificacao(){
    document.getElementById('etapa-pagamento').style.display ='none'
    document.getElementById('etapa-identificacao').style.display = 'block'
}

function fecharModal(){
    document.getElementById('modal-identificacao').style.display = 'none'
}

function enviarPedidoZap(){ 
// as linhas abaixo serve para coletar todos os dados 
let nome = document.getElementById('cliente-nome').value
            let telefone = document.getElementById('cliente-telefone').value
            let pagamento = document.getElementById('forma-pagamento').value
            let troco = document.getElementById('troco-para').value


// Essas linhas abaixo monta a mensagem que chega no whatshapp do estabelecimento
let carrinho = JSON.parse(localStorage.getItem('meuCarrinho')) || []
let total = 0;

            let mensagem = `*NOVO PEDIDO - BAR DO ADILSON*\n\n`;
            mensagem += `*Cliente:* ${nome}\n`;
            mensagem += `*Contato:* ${telefone}\n`;
            mensagem += `*Pagamento:* ${pagamento}\n`;
            if(pagamento === "Dinheiro" && troco !== "") {
                mensagem += `*Troco para:* ${troco}\n`;
            }
            mensagem += `\n*--- ITENS ---*\n`;

            carrinho.forEach(item => {
                let subtotal = item.preco * item.quantidade;
                total += subtotal;
                mensagem += `${item.quantidade}x ${item.nome} \n`;
            });

            mensagem += `\n*TOTAL: R$ ${total.toFixed(2)}*\n`;
            
// essas linhas abaixo envia mensagem para o estebelecimento
            let numeroBar = "31983866552";  
            let url = `https://wa.me/${31983866552}?text=${encodeURIComponent(mensagem)}`;
            
            // Limpa carrinho (opcional)
            // localStorage.removeItem('meuCarrinho');
            
            window.open(url, '_blank');
        }


// Para o botao limpar funcionar melhor vou adicionar mais linhas na função renderizar carrinho

//Isso significa que, se chamarmos renderizarCarrinho() logo após limparmos os dados, 
//a função abaixo vai "perceber" que não tem nada lá e automaticamente vai mostrar a mensagem de vazio e zerar o total.
//essa função esta diretamente ligada ao id=modal-limpar class-modal-fundo
//essas linhas abaixo e que faz o formulario de indetificação funcionar corretamente

//Função chamada pelo botão "Limpar" na tela principal
function abrirModalLimpar() {
    let carrinho = JSON.parse(localStorage.getItem('meuCarrinho')) || [];
    
// Só abre o modal se tiver algo para limpar!
    if (carrinho.length === 0) {
        alert("O carrinho já está vazio!");
        return;
    }
    
    document.getElementById('modal-limpar').style.display = 'flex';
}

//Função chamada pelo botão "Cancelar" dentro do modal
function fecharModalLimpar() {
    document.getElementById('modal-limpar').style.display = 'none';
}

//Função chamada pelo botão "Sim, Esvaziar" (Ação real)
function confirmarLimpeza() {
    localStorage.removeItem('meuCarrinho');
    renderizarCarrinho(); // Atualiza a tela para mostrar "Vazio"
    atualizarBadge();     // Zera o contador do ícone
    fecharModalLimpar();  // Fecha o modal
}


function removerItem(index) {
    let carrinho = JSON.parse(localStorage.getItem('meuCarrinho')) || [];
    
    // Remove o item na posição 'index'
    carrinho.splice(index, 1);
    
    // Salva o carrinho atualizado
    localStorage.setItem('meuCarrinho', JSON.stringify(carrinho));
    
    // Atualiza a tela e o badge
    renderizarCarrinho();
    atualizarBadge();
}