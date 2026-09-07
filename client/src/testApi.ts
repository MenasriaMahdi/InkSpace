import {api} from './lib/api';

async function test() {
  try {
    // Test public endpoint (no auth needed)
    const { data } = await api.get('/posts');
    console.log('✅ API working!', data);
  } catch (error) {
    console.error('❌ API failed:', error);
  }
}

test();
