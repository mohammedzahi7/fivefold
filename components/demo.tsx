import { HeroGeometric } from "@/components/ui/shape-landing-hero"
import { StackedCircularFooter } from "@/components/ui/stacked-circular-footer"


function DemoHeroGeometric() {
    return <HeroGeometric badge="Kokonut UI"
            title1 = "Elevate Your"
            title2 = "Digital Vision" />
}

function StackedCircularFooterDemo() {
  return (
    <div className="block">
      <StackedCircularFooter />
    </div>
  );
}

export { DemoHeroGeometric, StackedCircularFooterDemo }
