# Proje: Ömer Şefa Güçkıran - Yazılım Paketleri Satış Platformu

## **Genel Bilgiler**

- **Domain**: omersefaguckiran.com
- **Stack**: Vite + React + TypeScript + Supabase + İyzico + Redux + Axios
- **AI Destek**: Cursor.ai

## Ana Sayfa

- Ana sayfa da yazılımcıdan bahsedilir, modern bir tasarım ile yazılımcının kendisinden bahsedilir, tamamen responsive bir tasarım yapılır ve animasyonlar eklenir.
- Ana sayfa da iyizico kullandığımızı belirtiriz. Yazılımcının hakkında, fotoğrafı gibi bilgileri ekleriz.
- Ana sayfa da yazılımcının yaptığı işlerden bahsedilir.
- Ana sayfa da yazılım nedir, yazılım hangi alanlarda kullanılır, yazılım nasıl çalışır gibi bilgileri ekleriz kaydırıcı bir bar ile.
- Cookies kullanılır. Cookies kullanıldığında kullanıcıya bilgilendirme yapılır.
- Örnek web site: https://www.godaddy.com/ gibi modern bir tasarım ile yazılımcının kendisinden bahsedilir, font ve temalar gibi detaylarının nasıl yapıldığını anlatılır.
- Şimdilik bu kadar bilgi ile ana sayfa yapılır, diğer sayfalar eklenirken güncellenecektir.

## **Kullanıcı Senaryoları**

### **Kullanıcılar İçin:**

1. **Kayıt/Giriş**:

Kullanıcılar, kayıt olurken bireysel veya kurumsal seçeneğini seçer.

Bireysel Kayıt:

Ad

Soyad

Email

Şifre

Telefon

Adres

Kurumsal Kayıt:

Şirket Adı

Vergi No

Email

Şifre

Telefon

Adres

Kullanıcılar, giriş yaparken, email ve şifre ile giriş yapabilirler.

2. **Paket Satın Alma**:

      - Kullanıcılar, mevcut yazılım paketlerini görüntüleyebilir.
      - İyzico ile ödeme yapabilir.
      - Ödeme işlemi başarılıysa, sipariş oluşturulur.

3. **Sipariş Takibi**:

      - Kullanıcılar, satın aldıkları paketleri görüntüleyebilir.
      - Paket durumunu (Örn: "Hazırlanıyor", "Teslim Edildi") takip edebilir.
      - Paketin alındığı tarih ve düzenlendiği tarih bilgilerini görebilir.
      - Siparişlerinin tamamını görüntüleyebilir.

4. **Profil Yönetimi**:
      - Kullanıcılar, email hariç diğer bilgilerini (ad, soyad, telefon, adres vb.) güncelleyebilir.

### **Admin İçin:**

1. **Kullanıcı Yönetimi**:

      - Admin, kullanıcıları listeleyebilir, silebilir veya düzenleyebilir.
      - Admin, kullanıcıların tüm bilgilerini (email dahil) güncelleyebilir.
      - Admin, kullanıcıların siparişlerini görüntüleyebilir.
      - Admin, bireysel ve kurumsal kullanıcıların farklı bilgilerini görüntüleyebilir, güncelleyebilir.

2. **Paket Yönetimi**:

      - Admin, yeni paketler ekleyebilir, mevcut paketleri düzenleyebilir veya silebilir.

3. **Sipariş Yönetimi**:

      - Admin, siparişleri görüntüleyebilir ve durumlarını güncelleyebilir (Örn: "Hazırlanıyor", "Teslim Edildi").
      - Admin, siparişlerin alındığı tarih ve düzenlendiği tarih bilgilerini görebilir.

4. **Bildirimler**:
      - Bir kullanıcı paket satın aldığında, admin'e email gönderilir.

---

## **Teknik Detaylar**

### **Frontend (Vite + React + TypeScript)**

- **Routing**: React Router DOM
- **State Management**: Redux Toolkit
- **API İletişimi**: Axios
- **UI**: Tailwind CSS(4.0) (Dark mode)
- **İ18n**: React-i18next
- **Validation**: Yup, Formik
- **Font**: Gdsherpa
- **Icons**: Lucide
- **Animations**: Framer Motion
- **SEO**: React Helmet, React Meta Tags, React Document Title, React Helmet Async
- **Error Handling**: React Error Boundary
- **Testing**: React Testing Library
- **Tokenization**: supabase auth token, supabase storage token, supabase refresh token, supabase session token
- **Performance**: React.memo, useCallback, useMemo
- **Bundling**: Webpack
- **Folder Structure**: Component bazlı bir proje yapısı izlenir, özel input, button, modal, dropdown gibi componentler kendi folder'ları altında bulunur.
- **Error Handling**: Global bir error handling mekanizması yapılır, hata alındığında kullanıcıya bir hata mesajı gösterilir, örneğin mail onayı vermediğinde sayfa da bir hata mesajı gösterilir, validasyon hatası alındığında da hata mesajı gösterilir.
- **ApiReturnTypeObject**: {data: any, error: any, isLoading: boolean, isError: boolean, isSuccess: boolean}
- **Custom Hooks**: Custom hooks kendi folder'ları altında bulunur.
- **Utils**: Utils kendi folder'ları altında bulunur.
- **Constants**: Constants kendi folder'ları altında bulunur.
- **Types**: Types kendi folder'ları altında bulunur.
- **Hooks**: Hooks kendi folder'ları altında bulunur.
- **Components**: Components kendi folder'ları altında bulunur.
- **Pages**: Pages kendi folder'ları altında bulunur.
- **Services**: Services kendi folder'ları altında bulunur.
- **Routing**: Routing index.tsx dosyası altında bulunur. En yüksek sürüm react router dom kullanılır. Layout, PrivateRoute, PublicRoute gibi componentler index.tsx dosyası altında bulunur. React.lazy, React.Suspense ile sayfa yüklenmeleri tamamen dinamik yapılır, sayfa yüklenirken loading gösterilir.

### **Backend (Supabase)**

- **Auth**: Email/Password
- **Database**: Paketler, siparişler ve kullanıcı bilgileri için tablolar.
- **Functions**: Ödeme tamamlandığında tetiklenecek webhook.

### **Ödeme (İyzico)**

- **Entegrasyon**: İyzico API ile ödeme işlemleri.
- **Güvenlik**: PCI DSS uyumluluğu için tokenization.

### **Email Bildirimi**

- **Nodemailer** veya **Supabase Functions** ile email gönderimi.

---

## **Veritabanı Yapısı**

### **Tablo: users**

Tablo: users id (UUID)

email (string, unique)

password (string, hashed)

phone (string)

address (text)

created_at (timestamp)

updated_at (timestamp)

role (string, "user" veya "admin")

user_type (string, "bireysel" veya "kurumsal")

first_name (string, nullable) → Sadece bireysel kullanıcılar için

last_name (string, nullable) → Sadece bireysel kullanıcılar için

company_name (string, nullable) → Sadece kurumsal kullanıcılar için

tax_number (string, nullable) → Sadece kurumsal kullanıcılar için

### **Tablo: packages**

- `id` (UUID)
- `name` (string)
- `price` (float)
- `description` (text)
- `features` (jsonb)
- `status` (string, "active" veya "inactive")
- `created_at` (timestamp)
- `updated_at` (timestamp)

### **Tablo: orders**

- `id` (UUID)
- `user_id` (UUID, users.id ile ilişkili)
- `package_id` (UUID, packages.id ile ilişkili)
- `payment_status` (string, "pending", "completed", "failed")
- `order_status` (string, "Hazırlanıyor", "Teslim Edildi")
- `created_at` (timestamp)
- `updated_at` (timestamp)

---

## **Admin Panel Özellikleri**

### **1. Kullanıcı Yönetimi**

- **Kullanıcı Listesi**: Tüm kullanıcıların listesi (email, ad, soyad, telefon, adres, kayıt tarihi, güncelleme tarihi, rol).
- **Kullanıcı Silme/Düzenleme**:
     - Admin, kullanıcıları silebilir veya tüm bilgilerini (email dahil) güncelleyebilir.

### **2. Paket Yönetimi**

- **Paket Ekleme/Düzenleme/Silme**:
     - Yeni paketler eklenebilir.
     - Mevcut paketlerin fiyat, açıklama ve durumu ("active" veya "inactive") güncellenebilir.
     - Paketler silinebilir.

### **3. Sipariş Yönetimi**

- **Sipariş Listesi**: Tüm siparişlerin listesi (kullanıcı bilgisi, paket bilgisi, ödeme durumu, sipariş durumu, alınma tarihi, güncelleme tarihi).
- **Sipariş Durumu Güncelleme**:
     - Admin, sipariş durumunu "Hazırlanıyor" veya "Teslim Edildi" olarak güncelleyebilir.

### **4. Bildirimler**

- **Email Bildirimi**:
     - Bir kullanıcı paket satın aldığında, admin'e email gönderilir.
     - Sipariş durumu değiştiğinde, kullanıcıya bilgilendirme email'i gönderilir.

---

## **İş Akışları**

### **Kullanıcı İş Akışı**

1. **Kayıt/Giriş**:

      - Kullanıcı kayıt olur veya giriş yapar.
      - Supabase Auth ile kimlik doğrulama yapılır.

2. **Paket Satın Alma**:

      - Kullanıcı bir paket seçer ve İyzico ile ödeme yapar.
      - Ödeme başarılıysa, `orders` tablosuna kayıt eklenir.

3. **Sipariş Takibi**:

      - Kullanıcı, sipariş durumunu ve tarih bilgilerini görüntüleyebilir.

4. **Profil Yönetimi**:
      - Kullanıcı, email hariç diğer bilgilerini güncelleyebilir.

### **Admin İş Akışı**

1. **Kullanıcı Yönetimi**:

      - Admin, kullanıcıları listeler, siler veya düzenler.

2. **Paket Yönetimi**:

      - Admin, yeni paketler ekler veya mevcut paketleri düzenler.

3. **Sipariş Yönetimi**:

      - Admin, sipariş durumlarını ve tarih bilgilerini günceller.

4. **Bildirimler**:
      - Admin, siparişlerle ilgili email bildirimleri alır.

---

## **Geliştirme Adımları**

1. **Frontend**:

      - Vite ile proje oluşturulur.
      - React Router DOM ile routing yapılır.
      - Tailwind CSS ile stil verilir.
      - Redux Toolkit ile state yönetimi yapılır.
      - Axios ile API iletişimi sağlanır.

2. **Backend**:

      - Supabase projesi oluşturulur.
      - Tablolar ve ilişkiler tanımlanır.

3. **Entegrasyonlar**:

      - İyzico API entegrasyonu yapılır.
      - Email bildirimi için Nodemailer veya Supabase Functions kullanılır.

4. **Admin Panel**:
      - Kullanıcı, paket ve sipariş yönetimi için arayüzler oluşturulur.

---

## **AI Destek (Cursor.ai)**

- Kod tamamlama ve optimizasyon için Cursor.ai kullanılır.
- Özellikle TypeScript tip tanımlamaları ve API entegrasyonlarında yardımcı olur.

---

## **Test Senaryoları**

1. **Kayıt/Giriş Testi**:

      - Kullanıcı kayıt olur ve giriş yapar.

2. **Ödeme Testi**:

      - İyzico Sandbox ile ödeme işlemi test edilir.

3. **Admin Panel Testi**:

      - Admin, kullanıcıları, paketleri ve siparişleri yönetir.

4. **Email Bildirimi Testi**:
      - Ödeme tamamlandığında admin'e email gönderilir.
      - Sipariş durumu değiştiğinde kullanıcıya email gönderilir.
