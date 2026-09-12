import test from 'node:test';
import assert from 'node:assert/strict';
import { contactLinks, contactDetails } from '../src/lib/contact.ts';

const empty = { phone: '', whatsapp: '', telegram: '', email: '', instagram: '' };
test('missing business details never produce live dummy links', () => {
  assert.equal(contactLinks(empty).filter(item => item.href).length, 0);
});
test('verified-format values produce correct contact protocols', () => {
  const links = contactLinks({ phone: '+12025550123', whatsapp: '+12025550123', telegram: '@example_team', email: 'hello@example.com', instagram: '@example.team' });
  assert.deepEqual(links.map(item => item.href), ['tel:+12025550123', 'https://wa.me/12025550123', 'https://t.me/example_team', 'mailto:hello@example.com', 'https://www.instagram.com/example.team/']);
});
test('malformed numbers, account URLs and invalid emails stay inactive', () => {
  const links = contactLinks({ phone: 'invalid', whatsapp: 'javascript:alert(1)', telegram: 'https://evil.example', email: 'hello\n@example.com', instagram: '../example' });
  assert.ok(links.every(item => !item.href));
});

test('approved destinations are preserved exactly', () => {
 assert.deepEqual(contactLinks(contactDetails).map(i=>i.href), ['tel:09001040402','https://wa.me/message/O3N4D4VFVTMBP1','https://t.me/pezhmandavoudi','mailto:Khatmarketing.group@gmail.com','https://www.instagram.com/khat.marketing?stkn=MWVxYnc1eGN3YXl6bQ%3D%3D&utm_source=qr']);
});
