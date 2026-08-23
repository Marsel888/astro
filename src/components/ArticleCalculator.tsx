import BirthChartCalculator from '@/components/BirthChartCalculator';
import RisingCalculator from '@/components/RisingCalculator';
import SignFocusCalculator from '@/components/SignFocusCalculator';
import TwoChartCalculator from '@/components/TwoChartCalculator';

/**
 * The calculator that belongs to an article, rendered inside the article itself.
 *
 * STRATEGY §4: a page that only explains something is a page AI Overview can
 * answer instead of us. A page that computes from the reader's own birth data
 * is not, because the model does not have that data. So the article keeps its
 * text, but the tool sits above it rather than behind a link at the bottom.
 */
export default function ArticleCalculator({ toolHref }: { toolHref: string }) {
  switch (toolHref) {
    case '/rising-sign-calculator':
      return <RisingCalculator headingAs="none" />;
    case '/moon-sign-calculator':
      return <SignFocusCalculator ns="moon" bodyKey="moon" headingAs="none" />;
    case '/venus-sign-calculator':
      return <SignFocusCalculator ns="venus" bodyKey="venus" headingAs="none" />;
    case '/mercury-sign-calculator':
      return <SignFocusCalculator ns="mercury" bodyKey="mercury" headingAs="none" />;
    case '/mars-sign-calculator':
      return <SignFocusCalculator ns="mars" bodyKey="mars" headingAs="none" />;
    case '/synastry-calculator':
      return <TwoChartCalculator mode="synastry" headingAs="none" />;
    case '/composite-chart-calculator':
      return <TwoChartCalculator mode="composite" headingAs="none" />;
    default:
      return <BirthChartCalculator headingAs="none" />;
  }
}
