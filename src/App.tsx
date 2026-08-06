import { useEffect, useState } from "react";

type Report = {
  code: string;
  title: string;
  description: string;
  date: string;
  pdf?: string;
  docx?: string;
};

type TeamMember = {
  initials: string;
  name: string;
  image?: string;
  bio?: string;
  linkedin?: string;
};

const siteBase = import.meta.env.BASE_URL;

const navigation = [
  ["Proje", "#proje"],
  ["Mimari", "#mimari"],
  ["Deney", "#deney"],
  ["Takım", "#takim"],
  ["Raporlar", "#raporlar"],
  ["Demo", "#demo"],
  ["İletişim", "#iletisim"],
];

const scenarios = [
  {
    code: "S0",
    title: "Yapay zekâ kapalı referans",
    text: "Kontrol döngüsünün ek çıkarım yükü olmadan zamanlama ve denge davranışı ölçülür.",
  },
  {
    code: "S1",
    title: "Düşük öncelikli çıkarım",
    text: "TinyML görevi, kritik kontrolün altında önceliklendirilerek normal birlikte çalışma incelenir.",
  },
  {
    code: "S2",
    title: "Artırılmış yapay zekâ yükü",
    text: "Daha sık çıkarım veya daha ağır model ile kaynak çekişmesinin etkisi görünür hâle getirilir.",
  },
  {
    code: "S3",
    title: "Çatışmalı önceliklendirme",
    text: "Kötü öncelik seçiminin gecikme kuyrukları ve son tarih kaçırmaları üzerindeki etkisi gözlenir.",
  },
  {
    code: "S4",
    title: "İyileştirilmiş ayrıştırma",
    text: "Önceliklendirme veya izolasyon yaklaşımıyla zamanlama davranışındaki iyileşme karşılaştırılır.",
  },
  {
    code: "S5",
    title: "İsteğe bağlı hata enjeksiyonu",
    text: "MPU veya kontrollü hata koşullarıyla güvenli durdurma ve hata yalıtımı değerlendirilir.",
  },
];

const metrics = [
  ["Jitter", "Kontrol periyodundaki sapma"],
  ["p95 / p99 / p99.9", "Nadir gecikmelerin görünürlüğü"],
  ["Son tarih kaçırma", "Sayı ve koşu başına oran"],
  ["Çıkarım süresi", "TinyML yürütme gecikmesi"],
  ["RMS eğim hatası", "Fiziksel denge kalitesi"],
  ["Güvenli durdurma", "Olay sayısı ve nedeni"],
];

const team: TeamMember[] = [
  { initials: "AK", name: "Ali Hakan Kıncal" },
  { initials: "UT", name: "Uğur Talan",
    image: `${siteBase}team/ugur-talan.png`,
    bio: "TOBB ETÜ Bilgisayar Mühendisliği son sınıf öğrencisi. ServePointLabs'ta Android geliştirici olarak aktif çalışmaktadır",
    linkedin: "https://www.linkedin.com/in/u%C4%9Fur-talan-2090b6207/",
   },
  {
    initials: "MA",
    name: "Mert Can Ayhan",
    image: `${siteBase}team/mert-can-ayhan.jpeg`,
    bio: "TOBB ETÜ Bilgisayar Mühendisliği son sınıf öğrencisi. HAVELSAN’da Simülasyon, Otonom ve Platform Yönetim Sistemleri; İnnova Bilişim’de Full Stack geliştirme alanlarında deneyim kazandı.",
    linkedin: "https://www.linkedin.com/in/mert-can-ayhan-b56101309/",
  },
  { initials: "BA", name: "Barış Emre Ahi" },
];

const reports: Report[] = [
  {
    code: "01",
    title: "Proje Teklifi",
    description: "Problem, araştırma sorusu, hedefler, kapsam ve deney planı.",
    date: "21 Haziran 2026",
    pdf: `${siteBase}reports/proposal.pdf`,
    docx: `${siteBase}reports/proposal.docx`,
  },
  {
    code: "02",
    title: "Proje Spesifikasyon Raporu",
    description: "Fonksiyonel gereksinimler, kalite hedefleri ve kabul testleri.",
    date: "28 Haziran 2026",
    pdf: `${siteBase}reports/specifications.pdf`,
    docx: `${siteBase}reports/specifications.docx`,
  },
  {
    code: "03",
    title: "Analiz Raporu",
    description: "Aktörler, kullanım durumları, sistem davranışları ve arayüz beklentileri.",
    date: "12 Temmuz 2026",
    pdf: `${siteBase}reports/analysis-report.pdf`,
    docx: `${siteBase}reports/analysis-report.docx`,
  },
  {
    code: "04",
    title: "Proje Kısıt ve Etkiler Planı",
    description: "Standartlar, proje kısıtları ile ekonomik, sosyal ve güvenlik etkileri.",
    date: "31 Temmuz 2026",
    pdf: `${siteBase}reports/pke-plan.pdf`,
    docx: `${siteBase}reports/pke-plan.docx`,
  },
  {
    code: "05",
    title: "Yüksek Seviye Tasarım Raporu",
    description: "Alt sistemler, veri akışları, güvenlik sınırları ve küresel kontrol stratejisi.",
    date: "06 Ağustos 2026",
    pdf: `${siteBase}reports/hld-report.pdf`,
    docx: `${siteBase}reports/hld-report.docx`,
  },
  {
    code: "06",
    title: "Düşük Seviye Tasarım Raporu",
    description: "Somut bileşenler, veri yapıları ve ayrıntılı uygulama tasarımı.",
    date: "Hazırlanıyor",
  },
  {
    code: "07",
    title: "Test Planı Raporu",
    description: "Test stratejisi, test senaryoları, doğrulama yöntemleri ve kabul kriterleri.",
    date: "Hazırlanıyor",
  },
  {
    code: "08",
    title: "Final Raporu",
    description: "Deney sonuçları, karşılaştırmalı bulgular ve proje değerlendirmesi.",
    date: "Hazırlanıyor",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeWithEscape);
    return () => window.removeEventListener("keydown", closeWithEscape);
  }, []);

  return (
    <>
      <a className="skip-link" href="#icerik">
        İçeriğe geç
      </a>

      <header className="site-header">
        <a className="brand" href="#ana-sayfa" aria-label="Ana sayfaya git">
          <span className="brand-mark" aria-hidden="true">
            <i />
          </span>
          <span>
            <strong>RTOS · EDGE AI</strong>
            <small>BİL/YAP 495</small>
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-controls="site-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
        </button>

        <nav
          id="site-navigation"
          className={menuOpen ? "site-navigation is-open" : "site-navigation"}
          aria-label="Ana menü"
        >
          {navigation.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main id="icerik">
        <section className="hero" id="ana-sayfa" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span /> TOBB ETÜ · BİL/YAP 495
            </p>
            <h1 id="hero-title">
              Zamanı ölç.
              <br />
              <em>Dengeyi koru.</em>
            </h1>
            <p className="hero-lead">
              Kaynak-kısıtlı bir mikrodenetleyicide TinyML çıkarımının, gerçek zamanlı denge
              kontrolünün zamanlama determinizmine etkisini fiziksel bir robot üzerinde ölçüyoruz.
            </p>
            <div className="hero-actions" aria-label="Hızlı bağlantılar">
              <a className="button button-primary" href="#proje">
                Projeyi incele <Arrow />
              </a>
              <a className="button button-secondary" href="#raporlar">
                Raporlara git
              </a>
            </div>
          </div>

          <div
            className="system-visual"
            role="img"
            aria-label="İki tekerlekli denge robotunun 500 Hz kontrol döngüsünü, TinyML görevini ve zamanlama ölçümlerini temsil eden teknik görsel"
          >
            <div className="visual-topline">
              <span>SİSTEM / ÇALIŞMA HEDEFİ</span>
              <span className="live-indicator">500 Hz</span>
            </div>
            <div className="robot-stage">
              <div className="axis axis-x" />
              <div className="axis axis-y" />
              <div className="robot">
                <span className="wheel wheel-left" />
                <span className="wheel wheel-right" />
                <span className="robot-body">
                  <i className="chip">M7</i>
                  <i className="sensor" />
                </span>
              </div>
              <span className="angle-label">θ → 0°</span>
              <span className="signal signal-a" />
              <span className="signal signal-b" />
              <span className="signal signal-c" />
            </div>
            <div className="visual-metrics">
              <div>
                <span>PERİYOT</span>
                <strong>2 ms</strong>
              </div>
              <div>
                <span>SENARYO</span>
                <strong>S0—S5</strong>
              </div>
              <div>
                <span>KUYRUK</span>
                <strong>p99.9</strong>
              </div>
            </div>
          </div>

          <div className="hero-footnote">
            <span>01</span>
            <p>Gerçek zamanlı kontrol · robotik · FreeRTOS · TinyML</p>
          </div>
        </section>

        <section className="section project-section" id="proje" aria-labelledby="project-title">
          <div className="section-heading">
            <p className="section-index">01 / PROJE</p>
            <h2 id="project-title">Aynı çekirdek, iki farklı zaman ölçeği.</h2>
          </div>

          <div className="project-grid">
            <article className="feature-card feature-card-large">
              <span className="card-number">01</span>
              <div>
                <p className="card-label">PROBLEM</p>
                <h3>Ortalama süre, gerçek zamanlı güvence değildir.</h3>
                <p>
                  TinyML çıkarımı CPU, RAM ve bellek bant genişliğini kritik kontrol göreviyle
                  paylaşır. Kabul edilebilir ortalamalar; nadir gecikmeleri, jitter artışını veya son
                  tarih kaçırmalarını tek başına açıklamaz.
                </p>
              </div>
            </article>

            <article className="feature-card">
              <span className="card-number">02</span>
              <div>
                <p className="card-label">MOTİVASYON</p>
                <h3>Zamanlama etkisini fiziksel olarak görünür kılmak.</h3>
                <p>
                  Denge robotu, yazılım gecikmesini yalnızca bir sayı olarak değil; eğim hatası,
                  kararsızlık ve güvenli durdurma olayı olarak gözlemlemeyi sağlar.
                </p>
              </div>
            </article>

            <article className="feature-card accent-card">
              <span className="card-number">03</span>
              <div>
                <p className="card-label">ÖNERİLEN ÇÖZÜM</p>
                <h3>Ölçülebilir ve ayrıştırılmış bir deney platformu.</h3>
                <p>
                  FreeRTOS tabanlı Cortex-M7 sistemi; PID kontrolü, TinyML zemin sınıflandırması,
                  DWT zamanlama ölçümü ve PC telemetrisini aynı deney koşusunda birleştirir.
                </p>
              </div>
            </article>
          </div>

          <blockquote className="research-question">
            <p className="card-label">ARAŞTIRMA SORUSU</p>
            <p>
              TinyML görevinin yürütme süresi, önceliği ve periyodu; kontrol döngüsünün jitter,
              yürütme süresi, son tarih kaçırma oranı ve fiziksel denge kalitesini nasıl etkiliyor?
            </p>
          </blockquote>
        </section>

        <section className="section architecture-section" id="mimari" aria-labelledby="architecture-title">
          <div className="section-heading section-heading-light">
            <p className="section-index">02 / SİSTEM MİMARİSİ</p>
            <h2 id="architecture-title">Kritik yol korunur, her çevrim ölçülür.</h2>
            <p className="section-intro">
              Sistem, gerçek zamanlı robot düğümü ile deney yönetimi ve analizden sorumlu yerel PC
              düğümünü kontrollü bir telemetri hattıyla birleştirir.
            </p>
          </div>

          <div className="architecture-map" aria-label="Sistem mimarisi akışı">
            <article className="architecture-node robot-node">
              <header>
                <span>01 / ROBOT DÜĞÜMÜ</span>
                <strong>STM32H743 · FreeRTOS</strong>
              </header>
              <ol>
                <li>
                  <span>01</span>
                  <div><strong>IMU + Durum Kestirimi</strong><small>Zaman damgalı eğim ve açısal hız</small></div>
                </li>
                <li className="critical-path">
                  <span>02</span>
                  <div><strong>Gerçek Zamanlı Kontrol</strong><small>2 ms periyot · PID · son tarih takibi</small></div>
                </li>
                <li>
                  <span>03</span>
                  <div><strong>Motor Aktüasyon</strong><small>PWM · yön · güvenlik etkinleştirmesi</small></div>
                </li>
                <li>
                  <span>04</span>
                  <div><strong>TinyML Çıkarımı</strong><small>Kopyalanmış IMU penceresi · düşük öncelik</small></div>
                </li>
              </ol>
            </article>

            <div className="data-link" aria-hidden="true">
              <span>USB / UART</span>
              <i />
              <small>CRC · sıra no · sınırlı tampon</small>
            </div>

            <article className="architecture-node pc-node">
              <header>
                <span>02 / DENEY DÜĞÜMÜ</span>
                <strong>Yerel PC</strong>
              </header>
              <ol>
                <li>
                  <span>01</span>
                  <div><strong>Deney Orkestrasyonu</strong><small>Senaryo · sürüm · yapılandırma</small></div>
                </li>
                <li>
                  <span>02</span>
                  <div><strong>Canlı İzleme</strong><small>Eğim · jitter · yapay zekâ · güvenlik</small></div>
                </li>
                <li>
                  <span>03</span>
                  <div><strong>Kalıcı Veri</strong><small>SQLite üst verisi · CSV ham telemetri</small></div>
                </li>
                <li>
                  <span>04</span>
                  <div><strong>Analiz ve Raporlama</strong><small>Yüzdelikler · grafikler · karşılaştırma</small></div>
                </li>
              </ol>
            </article>
          </div>

          <aside className="safety-strip" aria-labelledby="safety-title">
            <div className="safety-icon" aria-hidden="true">!</div>
            <div>
              <p className="card-label">GÜVENLİK GÖZETİMİ</p>
              <h3 id="safety-title">Motor etkinleştirme kararında en yüksek yetki.</h3>
            </div>
            <p>
              Aşırı eğim, eski sensör verisi, tekrarlayan son tarih kaçırma veya kullanıcı durdurma
              komutu; motorları devre dışı bırakır ve sistemi güvenli duruma geçirir.
            </p>
          </aside>
        </section>

        <section className="section experiment-section" id="deney" aria-labelledby="experiment-title">
          <div className="section-heading">
            <p className="section-index">03 / DENEY YAKLAŞIMI</p>
            <h2 id="experiment-title">Yükü değiştir. Kuyruğu ölç. Sonucu karşılaştır.</h2>
          </div>

          <div className="experiment-layout">
            <div className="scenario-list">
              {scenarios.map((scenario) => (
                <article className="scenario" key={scenario.code}>
                  <span>{scenario.code}</span>
                  <div>
                    <h3>{scenario.title}</h3>
                    <p>{scenario.text}</p>
                  </div>
                </article>
              ))}
            </div>

            <aside className="measurement-panel" aria-labelledby="metrics-title">
              <div className="panel-kicker">ÖLÇÜM PANELİ / 06 METRİK</div>
              <h3 id="metrics-title">Sadece ortalama değil, dağılımın kuyruğu.</h3>
              <dl>
                {metrics.map(([term, description], index) => (
                  <div key={term}>
                    <dt><span>{String(index + 1).padStart(2, "0")}</span>{term}</dt>
                    <dd>{description}</dd>
                  </div>
                ))}
              </dl>
              <div className="acceptance-note">
                <strong>BAŞLANGIÇ KABUL HEDEFİ</strong>
                <span>Yapay zekâ kapalı durumda en az 30 saniye denge.</span>
              </div>
            </aside>
          </div>

          <div className="protocol-row" aria-label="Deney protokolü">
            <div><span>01</span><strong>Kalibre et</strong><small>IMU ve güvenlik koşulları</small></div>
            <div><span>02</span><strong>Senaryoyu seç</strong><small>Sürüm ve yapılandırmayı kaydet</small></div>
            <div><span>03</span><strong>Koşuyu yürüt</strong><small>Kontrolü bloklamadan ölç</small></div>
            <div><span>04</span><strong>Karşılaştır</strong><small>Dağılım, denge ve olaylar</small></div>
          </div>
        </section>

        <section className="section team-section" id="takim" aria-labelledby="team-title">
          <div className="section-heading section-heading-split">
            <div>
              <p className="section-index">04 / TAKIM</p>
              <h2 id="team-title">Disiplinler arası sistem düşüncesi.</h2>
            </div>
            <div className="advisors">
              <span>DANIŞMANLAR</span>
              <p>Tolga İnan</p>
              <p>Sadık Eğri</p>
            </div>
          </div>

          <div className="team-grid">
            {team.map((member, index) => (
              <article className="team-card" key={member.name}>
                {member.image ? (
                  <div className="portrait-frame">
                    <img
                      className="team-portrait"
                      src={member.image}
                      alt={`${member.name} için fotoğraf`}
                    />
                  </div>
                ) : (
                  <div
                    className="portrait-placeholder"
                    role="img"
                    aria-label={`${member.name} için fotoğraf hazırlanıyor`}
                  >
                    <span>{member.initials}</span>
                    <small>FOTOĞRAF HAZIRLANIYOR</small>
                  </div>
                )}
                <div className="team-card-copy">
                  <span className="member-index">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{member.name}</h3>
                  <p>{member.bio ?? "Kısa biyografi hazırlanıyor."}</p>
                  {member.linkedin ? (
                    <a
                      className="member-link"
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                    >
                      LinkedIn profili <Arrow />
                    </a>
                  ) : (
                    <span className="status-label">LinkedIn hazırlanıyor</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section reports-section" id="raporlar" aria-labelledby="reports-title">
          <div className="section-heading section-heading-light section-heading-split">
            <div>
              <p className="section-index">05 / RAPORLAR</p>
              <h2 id="reports-title">Kararlar, gereksinimler ve tasarım kayıt altında.</h2>
            </div>
            <p className="section-intro">
              Mevcut dosyalar doğrudan açılır. Repository’de bulunmayan biçimler için çalışmayan
              bağlantı yerine hazırlık durumu gösterilir.
            </p>
          </div>

          <div className="reports-list">
            {reports.map((report) => (
              <article className="report-row" key={report.code}>
                <span className="report-code">{report.code}</span>
                <div className="report-main">
                  <h3>{report.title}</h3>
                  <p>{report.description}</p>
                </div>
                <div className="report-date">
                  <span>TESLİM / DURUM</span>
                  <strong>{report.date}</strong>
                </div>
                <div className="report-actions" aria-label={`${report.title} dosyaları`}>
                  {report.pdf ? (
                    <a href={report.pdf} target="_blank" rel="noreferrer">
                      PDF’yi aç <Arrow />
                    </a>
                  ) : (
                    <span className="status-label">PDF hazırlanıyor</span>
                  )}
                  {report.docx ? (
                    <a href={report.docx} download>
                      DOCX’i indir <Arrow />
                    </a>
                  ) : (
                    <span className="status-label">DOCX hazırlanıyor</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section demo-section" id="demo" aria-labelledby="demo-title">
          <div className="demo-visual">
            <div className="demo-grid" aria-hidden="true" />
            <div className="demo-placeholder">
              <span className="play-mark" aria-hidden="true">▶</span>
              <strong>DEMO KAYDI HAZIRLANIYOR</strong>
              <small>Robot, telemetri ve güvenli durdurma akışı</small>
            </div>
          </div>

          <div className="demo-copy">
            <p className="section-index">06 / DEMO</p>
            <h2 id="demo-title">Zamanlama verisi, fiziksel davranışla birlikte.</h2>
            <p>
              Demo; yapay zekâ kapalı referans koşusunu, düşük öncelikli TinyML çıkarımını, canlı
              zamanlama metriklerini ve güvenli durdurma davranışını göstermeyi hedefliyor.
            </p>
            <ul>
              <li><span>01</span> Kalibrasyon ve hazır durumu</li>
              <li><span>02</span> 500 Hz kontrol koşusu</li>
              <li><span>03</span> Canlı telemetri ve karşılaştırma</li>
            </ul>
            <span className="status-label status-label-light">Video bağlantısı hazırlanıyor</span>
          </div>
        </section>

        <section className="section contact-section" id="iletisim" aria-labelledby="contact-title">
          <div>
            <p className="section-index">07 / İLETİŞİM</p>
            <h2 id="contact-title">Projeyi kaynaklarıyla birlikte inceleyin.</h2>
          </div>

          <div className="contact-links">
            <a
              href="https://github.com/barisemre143/rtos-edge-ai-balancing-robot-site"
              target="_blank"
              rel="noreferrer"
            >
              <span>GITHUB REPOSITORY</span>
              <strong>Kaynak kodu ve belgeler</strong>
              <Arrow />
            </a>
            <div className="contact-pending">
              <span>TAKIM E-POSTASI</span>
              <strong>Hazırlanıyor</strong>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="brand footer-brand">
          <span className="brand-mark" aria-hidden="true"><i /></span>
          <span><strong>RTOS · EDGE AI</strong><small>BİL/YAP 495</small></span>
        </div>
        <p>TOBB Ekonomi ve Teknoloji Üniversitesi · Bilgisayar Mühendisliği</p>
        <a href="#ana-sayfa">Yukarı dön ↑</a>
      </footer>
    </>
  );
}

export default App;