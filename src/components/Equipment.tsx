import { Card } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

const equipmentList = [
  "12 FOOT WIDETONE BLACK/GREEN & 9 FOOT STUDIO BLUE/MOCHA BACKDROPS",
  "(1x) Aputure LS 1200d Pro LED",
  "(1x) DigitalFoto S300",
  "ASTERA PIXELTUBE SET OF 8",
  "SPUTNIK DS1",
  "(2x) 4 Bank Kinoflow",
  "(2x) 900D LED LIGHTPANELS",
  "(2x) 600D LED LIGHTPANELS",
  "(10x) C-Stands",
  "(2x) Combo Stands",
  "(6x) Sandbags",
  "Director's Chairs",
  "(3x) Apple Box",
  "Smoke Machines",
  "V Flats",
  "Sony Playback Speaker",
];

export const Equipment = () => {
  return (
    <section id="equipment" className="py-24 bg-studio-darker">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Lightbulb className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Available <span className="text-gradient-neon">Equipment Rentals</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            To support your production requirements, we offer a range of equipment rentals. 
            Please inquire in advance to confirm availability.
          </p>
        </div>

        <Card className="bg-card/30 backdrop-blur-sm border-border p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {equipmentList.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg hover:bg-muted/20 transition-colors group"
              >
                <div className="mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-150 transition-transform" />
                </div>
                <p className="text-foreground/90 group-hover:text-foreground transition-colors">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};
