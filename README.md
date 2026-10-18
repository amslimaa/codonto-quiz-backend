# 🦷 Codonto Quiz — API

API do **Codonto**, projeto desenvolvido na **UFPI** para apoiar o ensino de biossegurança em Odontologia. Além do quiz (perguntase tipos de jogador), atende o cadastro de alunos, pacientes, anamneses e agendamento de consultas da clínica.

> Front-ends: [`codonto-quiz-frontend`](https://github.com/amslimaa/codonto-quiz-frontend) (quiz web) e [`codonto-frontend`](https://github.com/amslimaa/codonto-frontend) (clínica).

## Funcionalidades

- Autenticação por sessão com JWT
- Cadastro de alunos, pacientes e anamneses
- Marcação de consultas
- Quiz: CRUD de perguntas com upload de imagem, tipos de jogador e consulta do quiz

### Regras de negócio

- Não é possível cadastrar aluno/professor com matrícula já existente
- Não é possível cadastrar paciente com telefone já existente
- Não é possível marcar consulta no mesmo horário de outra (paciente e aluno)

## Endpoints principais

| Método | Rota | Auth | Descrição |
| --- | --- | :-: | --- |
| `POST` | `/sessions` | — | Login (retorna JWT) |
| `GET` `PUT` | `/quiz` | — | Consulta / atualiza o quiz |
| `GET` `PUT` | `/playerstype` | — | Tipos de jogador |
| `GET` `POST` | `/pacients` | — | Lista / cadastra pacientes |
| `POST` | `/anamneses` | — | Registra anamnese |
| `GET` `POST` | `/consultas` | ✅ | Lista / agenda consultas |
| `POST` | `/alunos` | ✅ | Cadastra aluno |
| `GET` | `/profile` | ✅ | Perfil do usuário logado |
| `GET` `POST` `PUT` `DELETE` | `/questions` | ✅ | CRUD de perguntas |
| `POST` | `/files` | ✅ | Upload de imagem |

## Tecnologias

Node.js · Express · Sequelize (PostgreSQL) · JWT · bcryptjs · Yup · Multer

## Como rodar

```bash
yarn install
# crie o .env com as variáveis abaixo
yarn sequelize db:migrate
yarn sequelize db:seed:all
yarn dev
```

Variáveis de ambiente usadas: `PORT`, `APP_URL`, `DB_DIALECT`, `DB_HOST`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`.

Para produção: `yarn build && yarn start`.

## Autor

Feito por [Amós Magalhães](https://github.com/amslimaa).
