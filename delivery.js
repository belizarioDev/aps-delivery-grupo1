function autenticar(usuarios, email, senha) {
  const usuario = usuarios.find((u) => u.email === email);
  if (!usuario) {
    return false;
  }
  return usuario.senha === senha && usuario.ativo === true;
}