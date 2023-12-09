import textLogo from '/images/textLogo.png'

export default function Footer() {
  const wallapopLinks = ['Quiénes somos', 'Cómo funciona', 'Brand Book', 'Prensa', 'Empleo', '10º aniversario'];
  const soporteLinks = ['Centro de ayuda', 'Reglas de publicación', 'Consejos de seguridad'];
  const legalLinks = ['Aviso legal', 'Condiciones de uso', 'Política de privacidad', 'Política de Cookies'];
  const motorLinks = ['Particulares', 'Profesionales'];
  const wallapopProLinks = ['Impulsa tu negocio'];


  return (
   <footer className="mt-20 md:px-36 flex justify-center flex-wrap">
      <div className='mx-5'>
        <img src={textLogo} alt="" />
        <p className='text-sm my-5 text-[#90A4AE] '>Copyright© 2023 Wallapop© <br/> de sus respectivos propietarios</p>
      </div>

      <Column title="Wallapop" links={wallapopLinks} />
      <Column title="Soporte" links={soporteLinks} />
      <Column title="Legal" links={legalLinks} />
      <Column title="Motor" links={motorLinks} />
      <Column title="Wallapop PRO" links={wallapopProLinks} />
   </footer>
  )
}


function Column({ title, links }) {
  return (
    <div className="flex-1 m-5">
      <h3 className="text-[#607D8B] font-bold">{title}</h3>
      <ul>
        {links.map((link, index) => (
          <li className="text-[#90A4AE] mt-2" key={index}>
            <a className='hover:text-[#13c1ac]' href="#">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}


