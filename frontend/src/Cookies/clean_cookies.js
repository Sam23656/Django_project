import { jwtVerify } from 'jose';
import Cookies from 'js-cookie';

const secretKey = new TextEncoder().encode('django-insecure-$*aws+cm80*0u^2ec=fh+b7dite45))bhnx2%%@ls#rg%(-&!s');

async function cleanExpiresCookies() {
  let allCookies = Cookies.get();

  for (let cookieName of Object.keys(allCookies)) {
    const token = `${allCookies[cookieName]}`;
    try {
      const { payload, protectedHeader } = await jwtVerify(token, secretKey, {
        algorithms: ['HS256']
      });

      const expirationTime = payload.exp;
      const currentTime = Math.floor(Date.now() / 1000);

      if (expirationTime <= currentTime) {
        console.log('Token has expired. Cleaning cookie...');
        Cookies.remove(cookieName);
      } else {
        console.log('Token is still valid.');
      }
    } catch (error) {
      
    }
  }
}

export default cleanExpiresCookies;
