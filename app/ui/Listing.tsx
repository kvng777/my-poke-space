import { getPokemonList } from "../lib/actions"
import Image from "next/image";

export default async function Listing(){
  const data = await getPokemonList();

  return (
    <section className="flex flex-col justify-center w-full">
      <section className="grid grid-cols-6 gap-16">
          {data && data.map((item, idx) => {
            return (
              <section className="flex flex-col items-center justify-between" key={idx}>
                {item.name}
                {item.image &&
                  <Image className="w-20" src={item.image} width={35} height={53} alt={`Image of pokemon ${item.name}`}/>
                }
                
                <p className="flex flex-row">Number: {item.id}</p>
              </section>
            )
          })
          }
      </section>
      <p>PaginationGroup</p>
    </section>
  )
}
