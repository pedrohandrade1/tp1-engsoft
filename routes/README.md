# Estudantes

Retorna a lista dos testes **a serem feitos** pelo usuario logado:

**GET** ```http://localhost:5500/students/tests/todo/ ```

---

Retorna a lista dos testes **feitos** pelo usuario logado:

**GET** ``` http://localhost:5500/students/tests/done/ ```


# Professores

Cria uma nova prova:

**POST** ``` http://localhost:5500/teachers/tests/new/ ```

# Testes
Retorna as informações sobre um **teste especifico**:

**GET** ``` http://localhost:5500/tests/:testId/ ```

# Usuarios
Autentifica o usuario e cria sessão no back-end (passo necessário para que as proximas requisições da API tenham sucesso):

**GET** ```http://localhost:5500/users/auth/:email/:password/```

---

Retorna as informações pessoais do usuario logado:

**GET** ```http://localhost:5500/users/personal/```

---

Responde uma questão especifica de uma prova:
**POST** ```http://localhost:5500/users/answer/:questionId/:answer```