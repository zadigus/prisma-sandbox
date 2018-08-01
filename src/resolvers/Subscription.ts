import { Context } from '../utils';

export const Subscription = {
  newPost: {
    async subscribe(parent, args, ctx: Context, info) {
      return ctx.db.subscription.post(
        {
          where: { mutation_in: ['CREATED'] }
        },
        info
      );
    }
  }
};
