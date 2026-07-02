# Fluxos de produto

Notas de planejamento dos fluxos do app (não são documentação técnica - ver o [README](../README.md) na raiz para isso).

## Fluxos

- Fluxo 1 - estacionamentos que têm sistema de ticket
- Fluxo 2 - sistema próprio PayNPark

Usuário não precisa logar - opção na primeira tela (continuar sem conta).

**Usuários deslogados só podem:**

(Ler Ticket) → (Pagar Ticket [Pix])

**Usuários logados podem:**

- Cadastrar Carro
- Obter localização do Carro no Mapa
- Cadastrar cartão
- Histórico de pagamentos/estacionamentos
- Criar sessão → gerar ticket + pagar ticket
- ...Todas as funcionalidades.

## Telas a serem implementadas

### Inicial

- "Você no estacionamento: ___" (pegar a localização)
- Pagar Ticket (verificar se existe sessão de estacionamento ativa ou no-auth/só ler ticket)
- Estacionamentos Parceiros (lista de estacionamentos)
- Criar uma sessão (gerar ticket)

### Sessão (controlar sessão de estacionamento)

Se tiver sessão ativa:

- Ver localização do carro no mapa
- Ver QR code para entrar + sair do estacionamento
- Terminar sessão (pagar)

Se não:

- Botão "Iniciar sessão" → você está aqui? (localização ou escolha de estacionamento)

### Fluxo de pagar

- Escolher método de pagamento (deslogado só Pix)
- Pix (tela de espera sobre confirmação de pagamento)
- Cartão
- Confirmação de que o usuário pode sair do estacionamento

### Meus Pagamentos

- Histórico de pagamentos
- Cadastrar nova forma de pagamento
- Editar formas de pagamento

### Componentes

**BottomBar** (comum a todas as telas): acessa as telas do app

- Tela inicial
- Pagamentos
- Sessão
