# FEATURE 01 - Recuperação de Senha

#### Requisitos Funcionais (RF)

- FEAT01RFO1 - usuário deve poder recuperar sua senha, informando o seu e-mail;
- FEAT01RFO2 - O usuário deve receber um e-mail com instruções de recuperação de senha;
- FEAT01RFO3 - O usuário deve poder resetar sua senha;

#### Requisitos Não Funcionais (RNF)

- FEAT01RNFO1 - Utilizar Mailtrap para testar envios de e-mail em ambiente de desenvolvimento;
- FEAT01RNFO2 - Utilizar Amazon SES para envios em produção;
- FEAT01RNFO3 - O envio de e-mails deve acontecer em segundo plano (background job);

#### Regras de Negócio (RN)

- FEAT01RNO1 - O link enviado por e-mail para reset de senha, deve expirar em 2h;
- FEAT01RNO2 - O usuário deve digitar a nova senha duas vezes, sendo uma de confirmação;


# FEATURE 02 - Atualização do Perfil

#### Requisitos Funcionais

- FEAT02RFO1 - O usuário deve poder atualizar o seu perfil (nome, e-mail e senha);

#### Regras de Negócio

- FEAT02RNO1 - O usuário não pode alterar seu e-mail para um e-mail em uso por outro usuário.
- FEAT02RNO2 - Para atualizar a sua senha, o usuário deve informar sua senha antiga
- FEAT02RNO3 - O usuário deve digitar a nova senha duas vezes, sendo uma de confirmação;

# FEATURE 03 - Painel do prestador de serviço

#### Requisitos Funcionais (RF)

- FEAT03RFO1 - O prestador deve poder listar todos os seus agendamentos de um dia específico;
- FEAT03RFO2 - O prestador deve receber uma notificação sempre que houver um novo agendamento;
- FEAT03RFO3 - O prestador deve poder visualizar todas as notificações não lidas;

#### Requisitos Não Funcionais (RNF)

- FEAT03RNFO1 - Os agendamentos do prestador no dia devem ser armazenados em cache;
- FEAT03RNFO2 - As notificações do prestador devem ser armazenadas no MongoDB;
- FEAT03RNFO3 - As notificação do prestador devem ser enviadas em tempo-real utilizando socket-io;

#### Regras de Negócio 

- FEAT03RNO1 - A notificação deve ter um status de lida ou não lida para que o prestador possa controlar;

# # FEATURE 04 - Agendamento de Serviços

#### Requisitos Funcionais (RF)

- FEAT04RFO1 - O usuário deve poder listar todos os prestadores de serviços cadastrados;
- FEAT04RFO2 - O usuário deve poder listar os dias de um mês, de um prestador de serviços, com pelo menos um horário disponível;
- FEAT04RFO3 - O usuário deve poder listar os horários disponíveis em um dia específico de um prestador;
- FEAT04RFO4 - O usuário deve poder realizar um novo agendamento com um prestador.

#### Requisitos Não Funcionais (RNF)

- FEAT04RNFO1 - A listagem de prestadores deve ser armazenado em cache;

#### Regras de Negócio (RN)

- FEAT04RNO1 - Cada agendamento deve durar 1h;
- FEAT04RNO2 - Os agendamentos devem estar disponíveis das 08h às 18h (Primeiro as 8h e último as 17h);
- FEAT04RNO3 - O usuário não deve poder agendar em um horário já ocupado;
- FEAT04RNO4 - O usuário não deve poder agendar em horário que já passou;
- FEAT04RNO5 - O usuário não deve poder agendar um horário consigo mesmo;
