Sobre o projeto:
É um projeto grande o código deve ser de fácil manuteção e escalavel.
Arquitetura das pastas deve ser por dominío.

tecnologias do projeto:
- React + vite
- Typescript (sempre usar) 
- Tanstack Query versão 5
- React Router Dom 6
- Axios 
- Shadcn ui


Objetivo:
Criar um sistema de login que vai devolver um json com token e permissions.
Guarda token nos cookies e permissões no localstorage.
Criar um Hooks de permissões para consultar se o usuário tem permissão.
Como vai funcionar a proteção por rotas, quando fazer uma requisição para determinada rota.
Exemplo: /fiscal-units, vai enviar o token de acesso, o back-end vai validar se tem acesso, caso
não tenha vai retorna 403 e redirecionar o usuário antes que leve veja a página para uma tela de
não autorizado. Acho que uma forma de realizar isso é usando os Interceptadores do axios.

