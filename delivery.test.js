const { autenticar, forcaSenha, podeLogar, calcularFrete, aplicarCupom } = require('./delivery');

const usuarios = [
  { email: 'ana@delivery.com', senha: 'Ana12345', ativo: true },
  { email: 'bruno@delivery.com', senha: 'Bruno#2024', ativo: false }
];

// F1 · autenticar
test('CT-01: credenciais válidas autentica o usuário', () => {
  expect(autenticar(usuarios, 'ana@delivery.com', 'Ana12345')).toBe(true);
});

test('CT-02: senha incorreta com e-mail válido retorna false', () => {
  expect(autenticar(usuarios, 'ana@delivery.com', 'senhaerrada')).toBe(false);
});

test('CT-03: e-mail que não existe na base retorna false', () => {
  expect(autenticar(usuarios, 'ninguem@delivery.com', 'Ana12345')).toBe(false);
});

test('CT-04: conta inativa com senha correta retorna false', () => {
  expect(autenticar(usuarios, 'bruno@delivery.com', 'Bruno#2024')).toBe(false);
});

// F2 · forcaSenha
test('CT-05: senha curta é fraca', () => {
  expect(forcaSenha('Ab1')).toBe('fraca');
});

test('CT-06: 8 caracteres com 1 tipo é média', () => {
  expect(forcaSenha('12345678')).toBe('media');
});

test('CT-07: 8 caracteres com 2 tipos é média', () => {
  expect(forcaSenha('Abcdefgh')).toBe('media');
});

test('CT-08: 8 caracteres com 4 tipos é forte', () => {
  expect(forcaSenha('Abcdef1!')).toBe('forte');
});

// F3 · podeLogar
test('CT-09: usuário ativo sem falhas pode logar', () => {
  expect(podeLogar({ status: 'ativo', falhas: 0 })).toBe(true);
});

test('CT-10: usuário ativo com 2 falhas ainda pode logar', () => {
  expect(podeLogar({ status: 'ativo', falhas: 2 })).toBe(true);
});

test('CT-11: usuário ativo com 3 falhas não pode logar', () => {
  expect(podeLogar({ status: 'ativo', falhas: 3 })).toBe(false);
});

test('CT-12: usuário bloqueado não pode logar', () => {
  expect(podeLogar({ status: 'bloqueado', falhas: 0 })).toBe(false);
});

// F4 · calcularFrete
test('CT-13: distância curta custa 5', () => {
  expect(calcularFrete(2)).toBe(5);
});

test('CT-14: exatamente 3 km continua custando 5', () => {
  expect(calcularFrete(3)).toBe(5);
});

test('CT-15: 5 km custa 8 (5 + 2 x 1,50)', () => {
  expect(calcularFrete(5)).toBe(8);
});

test('CT-16: distância negativa lança erro', () => {
  expect(() => calcularFrete(-2)).toThrow('Distância inválida');
});

// F5 · aplicarCupom
test('CT-17: sem cupom mantém o valor', () => {
  expect(aplicarCupom(80, null)).toBe(80);
});

test('CT-18: cupom PRIMEIRA10 dá 10% de desconto', () => {
  expect(aplicarCupom(100, 'PRIMEIRA10')).toBe(90);
});

test('CT-19: cupom VIP20 dá 20% de desconto', () => {
  expect(aplicarCupom(50, 'VIP20')).toBe(40);
});

test('CT-20: cupom desconhecido lança erro', () => {
  expect(() => aplicarCupom(80, 'CUPOM123')).toThrow('Cupom inválido');
});