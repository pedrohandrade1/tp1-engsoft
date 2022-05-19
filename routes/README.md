# Estudantes

Retorna lista dos testes **a serem feitos** pelo usuario logado:

**GET** ```http://localhost:5500/students/tests/todo/ ```

---

Retorna lista dos testes **feitos** pelo usuario logado:

**GET** ``` http://localhost:5500/students/tests/done/ ```

---

Retorna informações sobre um **teste especifico** **feito** pelo usuario logado:

**GET** ``` http://localhost:5500/students/tests/:testId/ ```

# Professores
Retorna informações sobre um **teste especifico** realizado pelos alunos:

**GET** ``` http://localhost:5500/teachers/tests/:testId/ ```

---

Cria uma nova prova:

**POST** ``` http://localhost:5500/teachers/tests/new/ ```

# Testes
Retorna informações sobre um **teste especifico**:

**GET** ``` http://localhost:5500/tests/:testId/ ```

# Usuarios
Autentifica usuario e cria sessão no back-end (passo necessário para que as proximas requisições da API tenham sucesso):

**GET** ```http://localhost:5500/users/auth/:email/:password/```

---

Retorna informações pessoais do usuario logado:

**GET** ```http://localhost:5500/users/personal/```