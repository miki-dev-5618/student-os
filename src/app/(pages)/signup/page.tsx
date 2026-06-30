import { createUser } from '@/services/user.service';

export default function Page() {
  return (
    <form action={createUser}>
      <input type='text' placeholder='Name' name='name' />

      <input type='email' placeholder='Email' name='email' />
      <input type='password' placeholder='Password' name='password' />
      <button type='submit'>Sign up</button>
    </form>
  );
}
