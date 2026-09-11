import test from 'node:test';
import assert from 'node:assert/strict';
import { contactLinks } from '../src/lib/contact.ts';

const empty = { phone: '', whatsapp: '', telegram: '', email: '', instagram: '' };
test('missing business details never produce live dummy links', () => {
  assert.equal(contactLinks(empty).filter(item => item.href).length, 0);
});
test('verified-format values produce correct contact protocols', () => {
  const links = contactLinks({ phone: '+12025550123', whatsapp: '+12025550123', telegram: '@example_team', email: 'hello@example.com', instagram: '@example.team' });
  assert.deepEqual(links.map(item => item.href), ['tel:+12025550123', 'https://wa.me/12025550123', 'https://t.me/example_team', 'mailto:hello@example.com', 'https://www.instagram.com/example.team/']);
});
test('malformed numbers, account URLs and invalid emails stay inactive', () => {
  const links = contactLinks({ phone: '09000000000', whatsapp: 'javascript:alert(1)', telegram: 'https://evil.example', email: 'hello\n@example.com', instagram: '../example' });
  assert.ok(links.every(item => !item.href));
});
