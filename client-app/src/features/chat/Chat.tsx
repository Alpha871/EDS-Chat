import PromptArea from "@/components/shared/PromtArea";

import { useStore } from "@/app/store/store";
import { observer } from "mobx-react-lite";

function Chat() {
  const { companyStore, informationStore } = useStore();

  const { company } = companyStore;
  const { gsInformation } = informationStore;

  // useEffect(() => {
  //   const fetchCompanies = async () => {
  //     await getCompanies();
  //   };
  //   fetchCompanies();
  // }, [getCompanies]);

  console.log(company);

  if (company.length === 0) return null;

  const information =
    "EDS Global halen 12 bin m2 kapalı alanda Sakarya bölgesindeki kendi fabrikasında faaliyet gösteren, muhtelif tipte basınçlı tanklar üretimi konusunda gerek yenilikçi ürünleri ile gerekse de üretim kapasitesi açısından sektörün lider firmasıdır. Çok yakın zamanda devreye girecek olan ikinci fabrika ile toplamda 25 bin m2 kapalı üretim alanı ve toplam üretim kapasitesi ile sadece Türkiye'nin değil, Avrupa'nın da sayılı basınçlı tank üreticilerinden biri olacaktır." +
    "EDS Global markası global pazarlarda hızlı bir şekilde gelişmektedir. EDS Global markasının bilinirliği, tüm dünya çapında müşterilerin büyük memnuniyetiyle birlikte günden güne artmaktadır. Şuanda EDS Global, global bir üretici olarak, Asya ,Avrupa,Uzak Doğu,Orta Doğu , Güney-Kuzey Amerika ve diğer pazarlarda toplamda 100’den fazla ülkeye üretim ve ihracat yapmaktadır. EDS Global, 2 litreden 10.000 lt ‘ye kadar 10,16 ve 25 bar çalışma basınç değerlerinde geniş bir alanında üretim sunmaktadır. Bunun yanında EDS Global müşterilerine, 2 litreden 40.000 lt’ ye kadar EPDM/Bütil ve yüksek sıcaklıklığa dayanıklı solar membranların, muhtelif hidrofor-pompa aksesuarlarının, fleks hortumların, su arıtma sistemleri basınçlı depolama tanklarının ve arıtma sistemlerinin aksesuarlarının tedariğini de sağlamaktadır." +
    "EDS Global’in ürün gamı aşağıdaki gibidir:Değiştirilebilir Membranlı Tank Serileri ; ( Hidrofor Serisi Tankları, Isıtma Serisi Genleşme Tankları ve Solar Serisi Genleşme Tankları )Sabit Diyaframlı Tank Serileri ;( Hidrofor Serisi Tankları, Isıtma Serisi Genleşme Tankları ve Solar Serisi Genleşme Tankları ) EPDM/Bütil ve Özel Yüksek Sıcaklığa Dayanıklı Membranlar Fleks Hortumları Hidrofor-Pompa Aksesuarları ( Basınç Şalterleri , Sıvı Seviye Flatörleri, Hidromatlar, Manometreler, Sıvı Seviye Flatörleri, Prinç Bağlantı Ekipmanları,Valfler, Vanalar, Klepeler,  Su Arıtma Sistemleri için Basınçlı Su Depolama Tankları ( RO Tanklar ) , Değişik Tipte Filtreler, Filtre Kapları Bilindiği gibi , EDS Global’in sahip olduğu bu geniş ve yüksek kalitedeki ürün gamı, dünya genelinde çok az üreticide bulunmaktadır . Sahip olduğumuz bu avantajımızda EDS Global olarak bizlere büyük bir güç vermektedir. Bu gücü kullanarak müşterilerimize sunu söylemekteyiz; “EDS Global” Olarak sektördeki en yenilikçi ürünlerimizle daima sizlerleyiz.";

  return (
    <section className="flex flex-col">
      <PromptArea
        instructions={company[0].instructions}
        informations={gsInformation}
      />
    </section>
  );
}

export default observer(Chat);
