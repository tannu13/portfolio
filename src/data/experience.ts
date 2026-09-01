import type { Role } from "./types";

export const roles: Role[] = [
  {
    id: "freightexchange",
    company: "FreightExchange",
    role: "Developer",
    location: "Australia",
    from: "2022-11",
    to: "2026-01",
    current: true,
    tone: "signal",
    stories: [
      "Led the migration from a monolith to REST-based microservices, defining service boundaries and the API contracts between them.",
      "Designed virtualised data tables holding 10K+ records that stayed responsive under inline and bulk editing.",
      "Automated carrier onboarding, rate management and invoice reconciliation, cutting manual processing from about three weeks to one or two days.",
      "Integrated Stripe as part of the move to a SaaS business model, including the billing states the product had not previously had to represent.",
    ],
    metric: {
      value: "3 wks → 1-2 d",
      label: "Manual processing",
    },
  },
  {
    id: "wootag",
    company: "Wootag",
    role: "Software Engineer",
    location: "Singapore",
    from: "2021-04",
    to: "2022-11",
    tone: "flow",
    stories: [
      "Built React workflows for authoring interactive video advertising.",
      "Connected the React authoring tool to a lightweight Preact ad player over iframe and postMessage, keeping the two in sync without coupling their runtimes.",
      "Optimised publisher-side delivery under strict bundle-size constraints, supporting lightweight ad experiences across 50+ publishers.",
    ],
    metric: {
      value: "50+",
      label: "Publishers served",
    },
  },
  {
    id: "pinch",
    company: "Pinch / ACL Mobile",
    role: "Application Developer",
    location: "India",
    from: "2018-07",
    to: "2021-03",
    stories: [
      "Built Vue.js and React applications end to end, owning UI architecture and the integrations behind them.",
      "Redesigned high-volume CSV ingestion for files of one to four million rows.",
      "Reworked background processing and database persistence, reducing end-to-end processing time by roughly 86-95%.",
    ],
    metric: {
      value: "86-95",
      unit: "%",
      label: "Ingestion time cut",
    },
  },
];

/* -------------------------------------------------------------------
   The career axis. Positions are derived from the dates above so the
   timeline can never drift from the content.
   ------------------------------------------------------------------- */

const months = (ym: string) => {
  const [year, month] = ym.split("-").map(Number);
  return year * 12 + (month - 1);
};

const axisFrom = months(roles[roles.length - 1].from);
const axisTo = months(roles[0].to);
const axisSpan = axisTo - axisFrom;

export const positionOf = (ym: string) =>
  ((months(ym) - axisFrom) / axisSpan) * 100;

export const axisTicks = [2018, 2020, 2022, 2024, 2026]
  .map((year) => ({ label: String(year), at: positionOf(`${year}-01`) }))
  .map((tick) => ({ ...tick, at: Math.max(0, Math.min(100, tick.at)) }));

export const periodOf = (role: Role) => {
  const format = (ym: string) => {
    const [year, month] = ym.split("-").map(Number);
    const name = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][month - 1];
    return `${name} ${year}`;
  };
  return `${format(role.from)} - ${format(role.to)}`;
};
