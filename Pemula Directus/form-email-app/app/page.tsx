import { createDirectus, rest, createItem, } from "@directus/sdk"
import './globals.css';
const client = createDirectus('http://localhost:8054').with(rest());


export default function Home() {
  // handleSubmit function to be here
  const handleSubmit = async (formData) => {
    'use server';

    const full_name = formData.get('full_name');
    const email_address = formData.get('email_address');
    const phone_number = formData.get('phone_number');
    const country = formData.get('country');
    const about_you = formData.get('about_you');

    try {
      await client.request(
        createItem('user_data', {
          full_name,
          email_address,
          phone_number,
          country,
          about_you,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

return (
    
    <main>
      <form action={handleSubmit}>
        <h1>User Data Form</h1>
        <p>Please fill in your details below</p>
        <div className='form-flex'>
          <label htmlFor='name'>Full Name</label>
          <input id='name' name='full_name' required />
        </div>
        <div className='form-flex'>
          <label htmlFor='email'>Email Address</label>
          <input type='email' name='email_address' id='email' required />
        </div>
        <div className='form-flex'>
          <label htmlFor='phone'>Phone Number</label>
          <input type='tel' name='phone_number' id='phone' required />
        </div>
        <div className='form-flex'>
          <label htmlFor='country'>Choose your Country</label>
          <select name='country' id='country' required>
            <option value='kenya'>Kenya</option>
            <option value='usa'>United States</option>
            <option value='germany'>Germany</option>
            <option value='uae'>United Arab Emirates</option>
          </select>
        </div>
        <div className='form-flex'>
          <label htmlFor='aboutyou'>About You</label>
          <textarea
            id='aboutyou'
            name='about_you'
            rows='4'
            cols='50'
            required
            placeholder='Enter information about yourself...'
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </main>
  );
}