import express from 'express';
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.post('/users', (request, response) => {
  const { name, email } = request.body;
  const user = {
    name,
    email
  }

  return response.json(user)
});

app.listen(PORT, () => {
  console.log(`👨‍💻 Server started on port ${PORT}`);
});