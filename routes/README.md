# Estudantes

Autentifica o aluno e cria sessão no back-end (passo necessário para que as proximas requisições da API tenham sucesso):

**GET** ```http://localhost:5500/students/auth/:email/:password/```

---

Retorna as informações pessoais do aluno logado:

**GET** ```http://localhost:5500/students/personal/```

---

Retorna a lista dos testes **a serem feitos** pelo aluno logado:

**GET** ```http://localhost:5500/students/tests/todo/ ```

---

Retorna a lista dos testes **feitos** pelo aluno logado:

**GET** ``` http://localhost:5500/students/tests/done/ ```

---

Responde uma questão especifica de uma prova:

**POST** ```http://localhost:5500/students/answer/:questionId/:answer```

# Professores

Autentifica o professor e cria sessão no back-end (passo necessário para que as proximas requisições da API tenham sucesso):

**GET** ```http://localhost:5500/teachers/auth/:email/:password/```

---

Retorna as informações pessoais do professor logado:

**GET** ```http://localhost:5500/teachers/personal/```

---

Cria uma nova prova:

**POST** ``` http://localhost:5500/teachers/tests/new/ ```

# Testes
Retorna as informações sobre um **teste especifico**:

**GET** ``` http://localhost:5500/tests/:testId/ ```

