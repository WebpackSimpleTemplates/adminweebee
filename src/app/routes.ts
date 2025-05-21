import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

const page = (name: string) => `../pages/${name}.tsx`;

export default [
  index('redirects/redirect-to-lk.tsx'),

  route('/redirect-channel/:userId', 'redirects/redirect-channel.tsx'),
  route('/new-channel', page('new-channel')),

  layout('../pages/layout/index.tsx', [
    route('/:channelId', page('main')),
    route('/:channelId/channels', page('channels')),
    route('/:channelId/operators', page('operators')),
    route('/:channelId/tags', page('tags')),
  ]),

  route('/login', page('login')),
  route('/:page/*', "redirects/to-root.tsx")
] satisfies RouteConfig;
