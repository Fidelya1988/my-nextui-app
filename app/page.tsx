
import { SelectComponent } from "@/components/select-tsc";
import { SelectDate } from "@/components/select-date";
import { GlobalProvider } from "@/context/GlobalState";
import { Navbar } from "@/components/navbar";

const TscItems = [
  {
    id_offices: 151,
    offices_name: "ТСЦ МВС № 0541",
    offices_addr: "м. Вінниця, вул. Ботанічна, 24",
    lat: "49.25214728229569",
    long: "28.455221511418557",
  },
  {
    id_offices: 154,
    offices_name: "ТСЦ МВС № 6348",
    offices_addr: "м. Лозова, Мікрорайон 5, буд.3",
    lat: "48.881508956384494",
    long: "36.278663792870866",
  },
  {
    id_offices: 47,
    offices_name: "ТСЦ МВС № 3243",
    offices_addr: "м. Бровари, вул. Броварської сотні, 4А",
    lat: "50.50346808773778",
    long: "30.842412046906507",
  },
  {
    id_offices: 180,
    offices_name: "ТСЦ МВС № 5942*",
    offices_addr: "м. Конотоп, вул. Вирівська, буд. 19А",
    lat: "51.233561494533944",
    long: "33.20124357046406",
  },
  {
    id_offices: 177,
    offices_name: "ТСЦ МВС № 4651",
    offices_addr: "м. Львів, вул. Богданівська, 44",
    lat: "49.856679282856426",
    long: "24.075404539724055",
  },
  {
    id_offices: 19,
    offices_name: "ТСЦ МВС № 1247",
    offices_addr: "м. Павлоград, вул. Дніпровська, 334а",
    lat: "48.50895509643976",
    long: "35.89554318271297",
  },
  {
    id_offices: 55,
    offices_name: "ТСЦ МВС № 3542",
    offices_addr: "м. Олександрія, просп. Будівельників, 38",
    lat: "48.66691901698768",
    long: "33.077520166252",
  },
  {
    id_offices: 4,
    offices_name: "ТСЦ МВС № 0542*",
    offices_addr: "м. Гайсин, вул. Південна, 67",
    lat: "48.79647120697521",
    long: "29.40660382924968",
  },
  {
    id_offices: 20,
    offices_name: "ТСЦ МВС № 1248",
    offices_addr: "м. Кривий Ріг, вул. Стрельникова, 15",
    lat: "47.89116483705792",
    long: "33.41052400788629",
  },
  {
    id_offices: 66,
    offices_name: "ТСЦ МВС № 4646",
    offices_addr: "м. Шептицький, Червоноградського р-ну, вул. Корольова, 14А",
    lat: "50.39964425394705",
    long: "24.254801046006943",
  },
];

export default function Home() {
  
  return (
    <GlobalProvider>
      <Navbar/>
  
    <div className="flex justify-evenly py-8">
    
   
        <section>
          <SelectComponent
            label="Select Tsc"
            data={TscItems.map((i) => ({
              key: String(i.id_offices),
              label: `${i.offices_addr + i.offices_name}`,
            }))}
          />
        </section>
        <section>
          <SelectDate />
        </section>
     
    </div>
    </GlobalProvider>
  );
}
