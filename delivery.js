function autenticar(usuarios, email, senha) {
  const usuario = usuarios.find((u) => u.email === email);
  if (!usuario) {
    return false;
  }
  return usuario.senha === senha && usuario.ativo === true;
}

function forcaSenha(senha) {
  if (senha.length < 8) {
    return 'fraca';
  }
  const regras = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/];
  const tipos = regras.filter((regra) => regra.test(senha)).length;
  return tipos >= 3 ? 'forte' : 'media';
}

function podeLogar(usuario) {
  return usuario.status === 'ativo' && usuario.falhas < 3;
}

function calcularFrete(distanciaKm) {
  if (distanciaKm <= 0) {
    throw new Error('Distância inválida');
  }
  if (distanciaKm <= 3) {
    return 5;
  }
  return 5 + (distanciaKm - 3) * 1.5;
}