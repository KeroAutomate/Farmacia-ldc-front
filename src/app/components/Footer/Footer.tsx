import Image from 'next/image';
import Link from 'next/link';
export const runtime = 'edge';

const Footer = () => {
    return (
      <footer>
        <div className="bg-white h-auto p-4 lg:px-[10rem] flex flex-col md:flex-row  md:space-x-4">
          <div className="pb-4 lg:pb-0 lg:flex-1">
            <p className="text-black font-medium">
              Fale com a Lá de Casa
            </p>
            <p className="text-[#00ABDD]Marine font-bold text-xl">
              Conheça Nossos Contatos
            </p>
          </div>

          <div className="pb-4 lg:pb-0 lg:flex-1">
            <p className="text-[#00ABDD]Marine font-bold text-xl">
              Telefone para Contato
            </p>
            <p className="font-medium text-lg flex text-black">
              <Image
                src="/phone.svg"
                className="mr-1"
                alt="Phone"
                width={14}
                height={12}
              />
              85 9 9812-8172
            </p>
          </div>

          <div className="pb-4 lg:pb-0 lg:flex-1">
            <p className="text-[#00ABDD]Marine font-bold text-xl">
              Horário de Funcionamentos
            </p>
            <div className="w-1/2 md:w-1/2">
              <div className='flex flex-row justify-between'>
                <p className="text-black font-medium flex flex-row justify-between">
                  Seg a Sex{" "}
                </p>
                <p className="text-[#00ABDD]Marine font-semibold">6:30 - 21:00</p>
              </div>
              <div className='flex flex-row justify-between'>
                <p className="text-black font-medium flex flex-row justify-between">
                  Sab{" "}
                </p>
                <p className="text-[#00ABDD]Marine font-semibold">6:30 - 17:00</p>
              </div>
            </div>
          </div>

          <div className="pb-4 lg:pb-0 lg:flex-1">
            <p className="text-[#00ABDD]Marine font-bold text-xl">
              Nossas Redes Sociais
            </p>
            <div className="flex flex-row gap-4">
              <Link target="_blank" href="https://www.instagram.com/farmacialadecasa_/" replace>
                <Image
                  className="transition-all duration-300 ease-in-out hover:drop-shadow-neon md:hover:drop-shadow-neonTablet sm:hover:drop-shadow-neonMobile"
                  src="/ig.svg"
                  alt="Instagram"
                  width={25}
                  height={25}
                />
              </Link>

              <Link target="_blank" href="https://www.facebook.com/farmacialadecasa/">
                <Image
                  className="transition-all duration-300 ease-in-out hover:drop-shadow-neon md:hover:drop-shadow-neonTablet sm:hover:drop-shadow-neonMobile"
                  src="/fb.svg"
                  alt="Facebook"
                  width={25}
                  height={25}
                />
              </Link>

              <Link target="_blank" href="https://www.instagram.com/farmacialadecasa_/">
                <Image
                  className="transition-all duration-300 ease-in-out hover:drop-shadow-neon md:hover:drop-shadow-neonTablet sm:hover:drop-shadow-neonMobile"
                  src="/zap.svg"
                  alt="WhatsApp"
                  width={25}
                  height={25}
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-[#00ABDD] h-auto">
          <p className="md:px-200 p-8 md:text-sm text-xs text-white font-semibold text-wrap">
            Farmacia La de Casa LTDA; CNPJ: 39.987.831/0001-34 | Rua Marechal
            Deodoro, 161 B, Loja 2, Centro, Redenção-CE;
            <br />
            CEP: 62.790-000 |
            <br/>
            Telefone: (85) 99956-5162 (Whatsapp) |
            <br/>
            Horário de funcionamento:
            Consulte diretamente pelo telefone ou Whatsapp.
            <br/>
              Farmacêutico Responsável: Claúdio Beatriz - CRF Nº 0000.
            <br/>
              As promoções divulgadas são válidas por tempo determinado ou
              enquanto durar o estoque.
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  