export default function Home() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0 }
        body { font-family: Arial, sans-serif; background: #f0f0f0; color: #333; min-width: 320px }
        .header { background: #2d7a2d; padding: 0 16px; height: 52px; display: flex; align-items: center; justify-content: space-between }
        .logo { display: flex; align-items: center; gap: 8px }
        .logo svg { width: 28px; height: 28px; fill: #fff }
        .logo-text { color: #fff; font-size: 1.3rem; font-weight: 700 }
        .logo-sub { color: #a8e6a8; font-size: .75rem }
        .nav { display: flex; gap: 12px; align-items: center }
        .nav a { color: #ceffce; font-size: .82rem; text-decoration: none }
        .nav a:hover { color: #fff }
        .nav .btn { background: #fff; color: #2d7a2d; padding: 5px 12px; border-radius: 3px; font-weight: 700; font-size: .82rem }
        .subbar { background: #236023; padding: 5px 16px; display: flex; gap: 20px }
        .subbar a { color: #a8e6a8; font-size: .78rem; text-decoration: none }
        .subbar a:hover { color: #fff }
        .main { max-width: 780px; margin: 24px auto; padding: 0 16px }
        .upload-card { background: #fff; border-radius: 6px; padding: 28px 20px; text-align: center; box-shadow: 0 1px 4px rgba(0,0,0,.12) }
        .upload-card h2 { font-size: 1.1rem; color: #2d7a2d; margin-bottom: 6px }
        .upload-card p { color: #777; font-size: .85rem; margin-bottom: 20px; line-height: 1.5 }
        .upload-area { border: 2px dashed #2d7a2d; border-radius: 6px; padding: 28px 16px;
          display: flex; flex-direction: column; align-items: center; gap: 12px; margin-bottom: 16px; cursor: pointer }
        .upload-area svg { width: 48px; height: 48px; fill: #2d7a2d }
        .upload-area span { color: #555; font-size: .85rem }
        .btn-upload { background: #2d7a2d; color: #fff; border: none; padding: 11px 32px;
          border-radius: 4px; font-size: .95rem; font-weight: 700; cursor: pointer; width: 100%; max-width: 260px }
        .btn-upload:hover { background: #236023 }
        .note { color: #999; font-size: .78rem; margin-top: 8px }
        .features { display: flex; flex-direction: column; gap: 12px; margin-top: 20px }
        @media(min-width:580px) { .features { flex-direction: row } }
        .feat { background: #fff; border-radius: 6px; padding: 16px; text-align: center;
          box-shadow: 0 1px 3px rgba(0,0,0,.08); flex: 1 }
        .feat svg { width: 30px; height: 30px; fill: #2d7a2d; margin-bottom: 8px }
        .feat h3 { font-size: .88rem; margin-bottom: 4px; color: #333 }
        .feat p { font-size: .78rem; color: #777; line-height: 1.4 }
        .recent { background: #fff; border-radius: 6px; padding: 16px 20px; margin-top: 20px;
          box-shadow: 0 1px 3px rgba(0,0,0,.08) }
        .recent h3 { font-size: .95rem; color: #2d7a2d; margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 8px }
        .file-row { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #f5f5f5 }
        .file-row:last-child { border-bottom: none }
        .file-row svg { width: 22px; height: 22px; fill: #2d7a2d; flex-shrink: 0 }
        .file-name { font-size: .83rem; color: #333; flex: 1 }
        .file-size { font-size: .75rem; color: #999; white-space: nowrap }
        .file-dl { font-size: .75rem; color: #2d7a2d; text-decoration: none; white-space: nowrap }
        .footer { text-align: center; padding: 20px 16px; color: #999; font-size: .75rem; margin-top: 24px }
        .footer a { color: #2d7a2d; text-decoration: none }
        input[type=file] { display: none }
      `}</style>

      <div className="header">
        <div className="logo">
          <svg viewBox="0 0 24 24"><path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm7 14l5-5h-3V8h-4v4H7l5 5z"/></svg>
          <div>
            <div className="logo-text">APKadmin</div>
            <div className="logo-sub">Free APK Hosting</div>
          </div>
        </div>
        <nav className="nav">
          <a href="#">Home</a>
          <a href="#">My Files</a>
          <a href="#">Register</a>
          <a href="#" className="btn">Login</a>
        </nav>
      </div>

      <div className="subbar">
        <a href="#">Upload APK</a>
        <a href="#">Recent Files</a>
        <a href="#">Most Downloaded</a>
        <a href="#">Help</a>
      </div>

      <div className="main">
        <div className="upload-card">
          <h2>Upload & Share APK Files — Free</h2>
          <p>Upload your APK files and share them instantly.<br/>No registration required. Max file size: 500MB.</p>
          <label className="upload-area" htmlFor="apkfile">
            <svg viewBox="0 0 24 24"><path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/></svg>
            <span>Drag & drop your APK file here</span>
            <span style={{fontSize:'.78rem',color:'#aaa'}}>or click to browse</span>
          </label>
          <button className="btn-upload" onClick={() => document.getElementById('apkfile').click()}>
            Select APK File
          </button>
          <p className="note">Supported: .apk, .xapk, .zip — Max 500MB per file</p>
          <input type="file" id="apkfile" accept=".apk,.xapk,.zip"/>
        </div>

        <div className="features">
          <div className="feat">
            <svg viewBox="0 0 24 24"><path d="M13 2.05V4.05C17.39 4.59 20.5 8.58 19.96 12.97C19.5 16.61 16.64 19.5 13 19.93V21.93C18.5 21.38 22.5 16.5 21.95 11C21.5 6.25 17.73 2.5 13 2.05M11 2.06C9.05 2.25 7.19 3 5.67 4.26L7.1 5.74C8.22 4.84 9.57 4.26 11 4.06V2.06M4.26 5.67C3 7.19 2.25 9.04 2.05 11H4.05C4.24 9.58 4.8 8.23 5.69 7.1L4.26 5.67M2.06 13C2.26 14.96 3.03 16.81 4.27 18.33L5.69 16.9C4.81 15.77 4.24 14.42 4.06 13H2.06M7.1 18.37L5.67 19.74C7.18 21 9.04 21.79 11 22V20C9.58 19.82 8.23 19.25 7.1 18.37Z"/></svg>
            <h3>Fast Downloads</h3>
            <p>Global CDN ensures fast download speeds worldwide.</p>
          </div>
          <div className="feat">
            <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.79-5 7.93-2.67-1.14-5-4.43-5-7.93V7.18L12 5z"/></svg>
            <h3>Safe & Secure</h3>
            <p>All files are scanned and stored securely on our servers.</p>
          </div>
          <div className="feat">
            <svg viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
            <h3>Easy Sharing</h3>
            <p>Get a direct link instantly. Share anywhere.</p>
          </div>
        </div>

        <div className="recent">
          <h3>Recently Uploaded</h3>
          {[
            {name:"WhatsApp_v2.24.11.apk", size:"75.3 MB", time:"2 min ago"},
            {name:"Instagram_v321.0.0.apk", size:"112.8 MB", time:"15 min ago"},
            {name:"TikTok_v34.2.4.apk", size:"98.1 MB", time:"1 hr ago"},
            {name:"Spotify_v8.9.12.apk", size:"43.6 MB", time:"3 hr ago"},
            {name:"Telegram_v10.14.4.apk", size:"61.2 MB", time:"5 hr ago"},
          ].map((f, i) => (
            <div className="file-row" key={i}>
              <svg viewBox="0 0 24 24"><path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm7 14l5-5h-3V8h-4v4H7l5 5z"/></svg>
              <span className="file-name">{f.name}</span>
              <span className="file-size">{f.size}</span>
              <span className="file-size" style={{margin:'0 8px'}}>{f.time}</span>
              <a href="#" className="file-dl">Download</a>
            </div>
          ))}
        </div>
      </div>

      <div className="footer">
        <p>© 2025 APKadmin.com — Free APK Hosting Service &nbsp;|&nbsp;
        <a href="#">Privacy</a> &nbsp;|&nbsp;
        <a href="#">Terms</a> &nbsp;|&nbsp;
        <a href="#">DMCA</a> &nbsp;|&nbsp;
        <a href="#">Contact</a></p>
      </div>
    </>
  );
}
