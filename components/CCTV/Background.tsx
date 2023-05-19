import { Fragment } from "react";

export default function Background({ size }: { size: number }) {
  return (
    <div className="w-full gap-0 grid grid-cols-8">
      <img src="/assets/tiles/border_tl.png" className="w-full" />
      {[...Array(size)].map((_, i) => (
        <Fragment key={i}>
          <img src="/assets/tiles/border_t1.png" className="w-full" />
          <img src="/assets/tiles/border_t2.png" className="w-full" />
        </Fragment>
      ))}
      <img src="/assets/tiles/border_tr.png" className="w-full" />
      <img src="/assets/tiles/border_left.png" className="w-full" />
      {[...Array(size * 2)].map((_, i) => (
        <img src="/assets/tiles/wall.png" className="w-full" key={i} />
      ))}
      <img src="/assets/tiles/border_right.png" className="w-full" />
      <img src="/assets/tiles/border_left.png" className="w-full" />
      {[...Array(size * 2 - 1)].map((_, i) => (
        <img src="/assets/tiles/floor.png" className="w-full" key={i} />
      ))}
      <img src="/assets/tiles/sensei_floor_t.png" className="w-full" />
      <img src="/assets/tiles/border_right.png" className="w-full" />

      <img src="/assets/tiles/border_left.png" className="w-full" />
      {[...Array(size * 2 - 1)].map((_, i) => (
        <img src="/assets/tiles/floor.png" className="w-full" key={i} />
      ))}
      <img src="/assets/tiles/sensei_floor_m.png" className="w-full" />
      <img src="/assets/tiles/border_right.png" className="w-full" />

      <img src="/assets/tiles/border_left.png" className="w-full" />
      {[...Array(size * 2 - 1)].map((_, i) => (
        <img src="/assets/tiles/floor.png" className="w-full" key={i} />
      ))}
      <img src="/assets/tiles/sensei_floor_b.png" className="w-full" />
      <img src="/assets/tiles/border_right.png" className="w-full" />

      <img src="/assets/tiles/border_bl.png" className="w-full" />
      <img src="/assets/tiles/wall_b2.png" className="w-full" />
      <img src="/assets/tiles/door.png" className="w-full" />
      {[...Array(size - 1)].map((_, i) => (
        <Fragment key={i}>
          <img src="/assets/tiles/wall_b1.png" className="w-full" />
          <img src="/assets/tiles/wall_b2.png" className="w-full" />
        </Fragment>
      ))}
      <img src="/assets/tiles/border_br.png" className="w-full" />

      <img src="/assets/tiles/outerfloor1_l.png" className="w-full" />
      <img src="/assets/tiles/outerfloor1.png" className="w-full" />
      <img src="/assets/tiles/outerfloor_door.png" className="w-full" />
      {[...Array(size - 1)].map((_, i) => (
        <Fragment key={i}>
          <img src="/assets/tiles/outerfloor1.png" className="w-full" />
          <img src="/assets/tiles/outerfloor2.png" className="w-full" />
        </Fragment>
      ))}
      <img src="/assets/tiles/outerfloor1_r.png" className="w-full" />
    </div>
  );
}
