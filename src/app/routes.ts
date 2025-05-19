import { type RouteConfig, layout, route } from "@react-router/dev/routes";

const page = (name: string) => `../pages/${name}.tsx`;

export default [

  route('/select-campaign/:userId', page('select-campaign')),

  layout('../pages/layout/index.tsx', [
    route('/:campaignId', page('main')),
    route('/:campaignId/channels', page('channels')),
    route('/:campaignId/operators', page('operators')),
    route('/:campaignId/tags', page('tags')),
  ]),

  route('/login', page('login')),
  route('/:page/*', "to-root.tsx")
] satisfies RouteConfig;
