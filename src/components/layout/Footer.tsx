import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-rose-200/60 bg-white/50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="font-serif text-lg font-semibold text-wine">Lolita 図鑑</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-500">
              探索 Lolita 时尚的多样世界，从 Sweet 到 Gothic，
              <br />
              从日牌到国牌，一站了解。
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-medium text-stone-700">快速导航</h4>
            <div className="flex flex-col gap-1.5 text-sm text-stone-500">
              <Link to="/styles" className="transition-colors hover:text-wine">风格百科</Link>
              <Link to="/brands" className="transition-colors hover:text-wine">品牌图鉴</Link>
              <Link to="/wardrobe" className="transition-colors hover:text-wine">我的衣橱</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-medium text-stone-700">关于本站</h4>
            <p className="text-sm leading-relaxed text-stone-500">
              一个热爱 Lolita 文化的独立项目，
              <br />
              持续更新中。欢迎交流分享！
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-rose-200/40 pt-4 text-center text-xs text-stone-400">
          &copy; {new Date().getFullYear()} Lolita 図鑑 — 非商业交流项目
        </div>
      </div>
    </footer>
  )
}
