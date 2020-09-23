# Recuperação de Senha

#### Requisitos Funcionais

- O usuário deve poder recuperar sua senha, informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;


#### Requisitos Não Funcionais

- Utilizar Mailtrap para testar envios de e-mail em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

#### Regras de Negócio

- O link enviado por e-mail para reset de senha, deve expirar em 2h;
- O usuário deve digitar a nova senha duas vezes, sendo uma de confirmação;


# Atualização do Perfil

#### Requisitos Funcionais

- O usuário deve poder atualizar o seu perfil (nome, e-mail e senha);

#### Regras de Negócio

- O usuário não pode alterar seu e-mail para um e-mail em uso por outro usuário.
- Para atualizar a sua senha, o usuário deve informar sua senha antiga
- O usuário deve digitar a nova senha duas vezes, sendo uma de confirmação;


# Painel do prestador de serviço

#### Requisitos Funcionais

- O prestador deve poder listar todos os seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar todas as notificações não lidas;

#### Requisitos Não Funcionais

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificação do prestador devem ser enviadas em tempo-real utilizando socket-io;

#### Regras de Negócio 

- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar;

# Agendamento de Serviços

#### Requisitos Funcionais

- O usuário deve poder listar todos os prestadores de serviços cadastrados;
- O usuário deve poder listar os dias de um mês, de um prestador de serviços, com pelo menos um horário disponível;
- O usuário deve poder listar os horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador.

#### Requisitos Não Funcionais

- A listagem de prestadores deve ser armazenado em cache;

#### Regras de Negócio

- Cada agendamento deve durar 1h;
- Os agendamentos devem estar disponíveis das 08h às 18h (Primeiro as 8h e último as 17h);
- O usuário não deve poder agendar em um horário já ocupado;
- O usuário não deve poder agendar em horário que já passou;
- O usuário não deve poder agendar um horário consigo mesmo;
