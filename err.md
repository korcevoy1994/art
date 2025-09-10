[14:23:17.661] Running build in Washington, D.C., USA (East) – iad1
[14:23:17.661] Build machine configuration: 4 cores, 8 GB
[14:23:17.679] Cloning github.com/korcevoy1994/art (Branch: main, Commit: 52423b4)
[14:23:17.805] Previous build caches not available
[14:23:17.994] Cloning completed: 314.000ms
[14:23:18.292] Running "vercel build"
[14:23:18.701] Vercel CLI 47.0.5
[14:23:19.051] Installing dependencies...
[14:23:30.136] 
[14:23:30.136] added 208 packages in 11s
[14:23:30.136] 
[14:23:30.136] 22 packages are looking for funding
[14:23:30.136]   run `npm fund` for details
[14:23:30.388] Detected Next.js version: 14.2.25
[14:23:30.391] Running "npm run build"
[14:23:30.512] 
[14:23:30.512] > my-v0-project@0.1.0 build
[14:23:30.512] > next build
[14:23:30.513] 
[14:23:31.117] Attention: Next.js now collects completely anonymous telemetry regarding usage.
[14:23:31.117] This information is used to shape Next.js' roadmap and prioritize features.
[14:23:31.117] You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
[14:23:31.117] https://nextjs.org/telemetry
[14:23:31.118] 
[14:23:31.176]   ▲ Next.js 14.2.25
[14:23:31.176] 
[14:23:31.246]    Creating an optimized production build ...
[14:23:42.583]  ✓ Compiled successfully
[14:23:42.584]    Linting and checking validity of types ...
[14:23:45.640] Failed to compile.
[14:23:45.640] 
[14:23:45.641] ./tailwind.config.ts:4:5
[14:23:45.641] Type error: Type '["class"]' is not assignable to type 'DarkModeStrategy | undefined'.
[14:23:45.641]   Type '["class"]' is not assignable to type '["class", string]'.
[14:23:45.641]     Source has 1 element(s) but target requires 2.
[14:23:45.641] 
[14:23:45.641] [0m [90m 2 |[39m[0m
[14:23:45.641] [0m [90m 3 |[39m [36mconst[39m config[33m:[39m [33mConfig[39m [33m=[39m {[0m
[14:23:45.641] [0m[31m[1m>[22m[39m[90m 4 |[39m     darkMode[33m:[39m [[32m"class"[39m][33m,[39m[0m
[14:23:45.641] [0m [90m   |[39m     [31m[1m^[22m[39m[0m
[14:23:45.641] [0m [90m 5 |[39m     content[33m:[39m [[0m
[14:23:45.641] [0m [90m 6 |[39m     [32m"./pages/**/*.{js,ts,jsx,tsx,mdx}"[39m[33m,[39m[0m
[14:23:45.641] [0m [90m 7 |[39m     [32m"./components/**/*.{js,ts,jsx,tsx,mdx}"[39m[33m,[39m[0m
[14:23:45.659] Next.js build worker exited with code: 1 and signal: null
[14:23:45.678] Error: Command "npm run build" exited with 1