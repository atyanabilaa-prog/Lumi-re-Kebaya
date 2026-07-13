document.addEventListener("DOMContentLoaded", () => {
  // ==========================
  // SEARCH PRODUK
  // ==========================

  const searchInput = document.getElementById("searchInput");
  const productCards = document.querySelectorAll(".product-card");

  searchInput.addEventListener("keyup", function () {
    const keyword = this.value.toLowerCase();

    productCards.forEach((card) => {
      const namaProduk = card.querySelector("h3").textContent.toLowerCase();

      if (namaProduk.includes(keyword)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });

  // ==========================
  // PILIH WARNA
  // ==========================

  const semuaProduk = document.querySelectorAll(".product-card");

  semuaProduk.forEach((produk, index) => {
    const warnaButtons = produk.querySelectorAll(".color");

    // ambil warna yang tersimpan
    const warnaTersimpan = localStorage.getItem("warnaProduk_" + index);

    if (warnaTersimpan !== null) {
      warnaButtons.forEach((btn) => btn.classList.remove("active"));

      if (warnaButtons[warnaTersimpan]) {
        warnaButtons[warnaTersimpan].classList.add("active");
      }
    }

    warnaButtons.forEach((btn, warnaIndex) => {
      btn.addEventListener("click", function () {
        warnaButtons.forEach((item) => item.classList.remove("active"));

        this.classList.add("active");

        localStorage.setItem("warnaProduk_" + index, warnaIndex);
      });
    });
  });
});
// ===============================
// Modal Deskripsi Produk
// ===============================

const productData = {
  1: {
    title: "Aurora pinkys",
    price: "Rp499.000",
    image: "produk1.jpeg",
    stok: 10,
    description:
      "Kebaya modern high-low dengan full payet mewah, Kerah tinggi, dan motif 3D pastel yang anggun.",
  },

  2: {
    title: "Lavender Grace",
    price: "Rp500.000",
    image: "produk2.jpeg",
    stok: 10,
    description:
      "Kebaya modern berwarna lavender dengan detail payet berkilau, berpotongan pas badan yang elegan dan anggun untuk momen spesial.",
  },

  3: {
    title: "Seraphina Lumière",
    price: "Rp500.000",
    image: "produk3.jpeg",
    stok: 10,
    description:
      "Kebaya modern berpotongan pas badan warna soft pink dengan detail payet berkilau yang memberikan kesan mewah dan menawan.",
  },

  4: {
    title: "Ocean Serenade Top",
    price: "Rp398.000",
    image: "produk4.jpeg",
    stok: 10,
    description:
      "Atasan kebaya modern bernuansa biru samudera dengan detail payet elegan dan potongan lengan tegas yang anggun.",
  },

  5: {
    title: "Lumière Silk",
    price: "Rp490.000",
    image: "produk5.jpeg",
    stok: 10,
    description:
      "Rok panjang berbahan sutra premium dengan potongan sleek dan belahan tinggi yang memberikan kesan mewah serta elegan.",
  },

  6: {
    title: "Matcha Strawberry Top",
    price: "Rp450.000",
    image: "produk6.jpeg",
    stok: 10,
    description:
      "Atasan kebaya modern perpaduan unik warna hijau matcha dan pink dengan detail bordir bunga yang manis dan anggun.",
  },

  7: {
    title: "Evelyn Lace Top",
    price: "Rp299.000",
    image: "produk7.jpeg",
    stok: 10,
    description:
      "Atasan sleeveless brokat putih dengan kerah tinggi gaya cheongsam untuk tampilan modern yang rapi dan chic.",
  },

  8: {
    title: "Sakura Songket",
    price: "Rp300.000",
    image: "produk8.jpeg",
    stok: 10,
    description:
      "Rok bawahan songket bernuansa pink sakura dengan potongan lurus yang memberikan kesan tradisional namun tetap anggun.",
  },

  9: {
    title: "Honey Blossom",
    price: "Rp299.000",
    image: "produk9.jpeg",
    stok: 10,
    description:
      "Rok bawahan songket bernuansa emas lembut dengan detail motif bunga klasik yang memberikan kesan mewah dan anggun.",
  },

  10: {
    title: "Syhmpony Lace",
    price: "Rp310.000",
    image: "produk10.jpeg",
    stok: 10,
    description:
      "Atasan kebaya brokat putih lengan panjang berpotongan pas badan yang rapi, modern, dan cocok untuk berbagai acara formal.",
  },

  11: {
    title: "Camellia Songket",
    price: "Rp298.000",
    image: "produk11.jpeg",
    stok: 10,
    description:
      "Rok songket putih bersih dengan potongan lurus elegan yang memberikan tampilan tradisional namun tetap bersih dan minimalis.",
  },

  12: {
    title: "Ocean Springkle",
    price: "Rp278.000",
    image: "produk12.jpeg",
    stok: 10,
    description:
      "Rok bawahan dengan tekstur payet halus berkilau bernuansa cerah yang memberikan kesan anggun dan menawan.",
  },
};

// ===============================
// Muat perubahan admin (nama/harga/stok) yang tersimpan
// ===============================

const savedProductData = JSON.parse(
  localStorage.getItem("productData") || "null",
);

if (savedProductData) {
  Object.keys(savedProductData).forEach((id) => {
    if (productData[id]) {
      // Hanya timpa field yang memang bisa diubah admin.
      // Deskripsi & gambar TIDAK disentuh, selalu ikut kode terbaru.
      const { title, price, stok } = savedProductData[id];

      if (title !== undefined) productData[id].title = title;
      if (price !== undefined) productData[id].price = price;
      if (stok !== undefined) productData[id].stok = stok;
    }
  });
}

function saveProductData() {
  // Simpan hanya field yang diubah admin (title, price, stok)
  const dataToSave = {};

  Object.keys(productData).forEach((id) => {
    dataToSave[id] = {
      title: productData[id].title,
      price: productData[id].price,
      stok: productData[id].stok,
    };
  });

  localStorage.setItem("productData", JSON.stringify(dataToSave));
  applyProductDataToCards();
}

function applyProductDataToCards() {
  document.querySelectorAll(".product-card").forEach((card) => {
    const detailBtn = card.querySelector(".detailBtn");

    if (!detailBtn) return;

    const id = detailBtn.dataset.id;
    const product = productData[id];

    if (!product) return;

    card.querySelector("h3").textContent = product.title;
    card.querySelector(".harga").textContent = product.price;

    const cartBtn = card.querySelector(".cartButton");

    if (product.stok <= 0) {
      cartBtn.textContent = "Stok Habis";
      cartBtn.disabled = true;
      cartBtn.style.opacity = "0.5";
      cartBtn.style.cursor = "not-allowed";
    } else {
      cartBtn.textContent = "Tambah ke Keranjang";
      cartBtn.disabled = false;
      cartBtn.style.opacity = "";
      cartBtn.style.cursor = "";
    }
  });
}

applyProductDataToCards();

const productModal = document.getElementById("productModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");

const closeProductModal = document.getElementById("closeProductModal");

const detailButtons = document.querySelectorAll(".detailBtn");

detailButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.dataset.id;

    const product = productData[id];

    modalImage.src = product.image;
    modalTitle.textContent = product.title;
    modalPrice.textContent = product.price;
    modalDescription.textContent = product.description;

    productModal.style.display = "flex";
  });
});
closeProductModal.addEventListener("click", () => {
  productModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === productModal) {
    productModal.style.display = "none";
  }
});
// ===============================
// Tambah ke Keranjang
// ===============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartButtons = document.querySelectorAll(".cartButton");
const cartCount = document.getElementById("cart-count");

function updateCartCount() {
  let total = 0;

  cart.forEach((item) => {
    total += item.qty;
  });

  cartCount.textContent = total;

  localStorage.setItem("cart", JSON.stringify(cart));
}

cartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const id = Number(button.dataset.id);

    const product = productData[id];

    if (product.stok <= 0) {
      alert("Maaf, stok produk ini sedang habis.");
      return;
    }

    const existing = cart.find((item) => item.id === id);

    if (existing) {
      existing.qty++;
    } else {
      cart.push({
        id: id,
        title: product.title,
        price: product.price,
        image: product.image,
        qty: 1,
      });
    }

    updateCartCount();
  });
});

updateCartCount();
const cartBtn = document.getElementById("cartBtn");
const cartItems = document.getElementById("cartItems");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");

cartBtn.addEventListener("click", () => {
  renderCart();

  cartSidebar.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
});
function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Keranjang masih kosong.</p>";
    cartTotal.textContent = "Rp0";
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    const harga = Number(item.price.replace(/[^\d]/g, ""));

    total += harga * item.qty;

    const div = document.createElement("div");

    div.className = "cart-item";

    div.innerHTML = `
        
        <img src="${item.image}" class="cart-image">

        <div class="cart-detail">

            <h4>${item.title}</h4>

            <p>${item.price}</p>

            <div class="qty-box">

                <button class="minus" data-id="${item.id}">−</button>

                <span>${item.qty}</span>

                <button class="plus" data-id="${item.id}">+</button>

            </div>

        </div>

        <button class="delete-item" data-id="${item.id}">
            <i class="fa-solid fa-trash"></i>
        </button>

        `;

    cartItems.appendChild(div);
  });

  cartTotal.textContent = "Rp" + total.toLocaleString("id-ID");

  // =========================
  // Tombol +
  // =========================

  document.querySelectorAll(".plus").forEach((btn) => {
    btn.onclick = () => {
      const id = Number(btn.dataset.id);

      const item = cart.find((x) => x.id === id);

      item.qty++;

      localStorage.setItem("cart", JSON.stringify(cart));

      updateCartCount();

      renderCart();
    };
  });

  // =========================
  // Tombol -
  // =========================

  document.querySelectorAll(".minus").forEach((btn) => {
    btn.onclick = () => {
      const id = Number(btn.dataset.id);

      const item = cart.find((x) => x.id === id);

      item.qty--;

      if (item.qty <= 0) {
        cart = cart.filter((x) => x.id !== id);
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      updateCartCount();

      renderCart();
    };
  });

  // =========================
  // Tombol Hapus
  // =========================

  document.querySelectorAll(".delete-item").forEach((btn) => {
    btn.onclick = () => {
      const id = Number(btn.dataset.id);

      cart = cart.filter((x) => x.id !== id);

      localStorage.setItem("cart", JSON.stringify(cart));

      updateCartCount();

      renderCart();
    };
  });
}
// ===============================
// Reset Keranjang
// ===============================

const resetCart = document.getElementById("resetCart");

resetCart.addEventListener("click", () => {
  if (confirm("Yakin ingin mengosongkan keranjang?")) {
    cart = [];

    localStorage.removeItem("cart");

    updateCartCount();

    renderCart();
  }
});

// ===============================
// Beli Sekarang
// ===============================

const checkoutBtn = document.getElementById("checkoutBtn");

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Keranjang masih kosong.");
    return;
  }

  document.getElementById("checkoutModal").style.display = "flex";
});

// ===============================
// Checkout → Pembayaran
// ===============================

const checkoutModal = document.getElementById("checkoutModal");
const paymentModal = document.getElementById("paymentModal");
const paymentTotal = document.getElementById("paymentTotal");
paymentModal.style.display = "none";

const closeCheckout = document.getElementById("closeCheckout");
const closePayment = document.getElementById("closePayment");

const lanjutBayar = document.getElementById("lanjutBayar");
console.log("lanjutBayar =", lanjutBayar);

let checkoutData = {};
let lastOrder = { items: [], subtotal: 0, ongkir: 0, total: 0 };

// =======================
// Tutup Checkout
// =======================

closeCheckout.onclick = () => {
  checkoutModal.style.display = "none";
};

// =======================
// Tutup Payment
// =======================

closePayment.onclick = () => {
  paymentModal.style.display = "none";
};

// =======================
// Lanjut Pembayaran
// =======================

lanjutBayar.onclick = () => {
  const nama = document.getElementById("nama").value.trim();

  const alamat = document.getElementById("alamat").value.trim();

  const telepon = document.getElementById("telepon").value.trim();

  const shippingSelect = document.getElementById("shippingMethod");

  if (nama === "" || alamat === "" || telepon === "") {
    alert("Lengkapi data checkout terlebih dahulu.");

    return;
  }

  if (shippingSelect.value === "") {
    alert("Silakan pilih metode pengiriman terlebih dahulu.");

    return;
  }

  checkoutData.nama = nama;
  checkoutData.alamat = alamat;
  checkoutData.telepon = telepon;
  checkoutData.shippingLabel =
    shippingSelect.options[shippingSelect.selectedIndex].text;
  checkoutData.shippingCost = Number(
    shippingSelect.options[shippingSelect.selectedIndex].dataset.cost,
  );

  checkoutModal.style.display = "none";

  paymentTotal.textContent = document.getElementById("cartTotal").textContent;

  paymentModal.style.display = "flex";
};

// =======================
// Klik luar modal
// =======================

window.addEventListener("click", (e) => {
  if (e.target === checkoutModal) {
    checkoutModal.style.display = "none";
  }

  if (e.target === paymentModal) {
    paymentModal.style.display = "none";
  }
});
// ===============================
// Data Metode Pembayaran
// ===============================

const paymentInfo = document.getElementById("paymentInfo");
const payNowBtn = document.getElementById("payNowBtn");

const paymentData = {
  qris: `
    <h3>QRIS</h3>
    <img src="qris.jpeg" alt="QRIS" style="width:200px; margin-top:10px;">
    <p>Silakan scan QRIS di atas.</p>
  `,

  dana: `
    <h3>DANA</h3>
    <p><strong>Nomor:</strong> 0838-7851-1529</p>
    <p><strong>Atas Nama:</strong> Atiya Nabila Sabani</p>
  `,

  bni: `
    <h3>BNI</h3>
    <p><strong>No. Rekening:</strong> 1980210720</p>
    <p><strong>Atas Nama:</strong> Atiya Nabila Sabani</p>
  `,

  seabank: `
    <h3>SeaBank</h3>
    <p><strong>No. Rekening:</strong> 9019 3744 5877</p>
    <p><strong>Atas Nama:</strong> Atiya Nabila Sabani</p>
  `,

  shopeepay: `
    <h3>ShopeePay</h3>
    <p><strong>Nomor:</strong> 0838-2719-6763</p>
    <p><strong>Atas Nama:</strong> Lumière Kebaya</p>
  `,
};
// ===============================
// Pilih Metode Pembayaran
// ===============================

let selectedPayment = "";

document.querySelectorAll(".paymentOption").forEach((button) => {
  button.addEventListener("click", () => {
    const metode = button.dataset.payment;

    selectedPayment = metode;

    document.querySelectorAll(".paymentOption").forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    // Tampilkan detail metode pembayaran yang dipilih
    if (paymentData[metode]) {
      paymentInfo.innerHTML = paymentData[metode];
    } else {
      paymentInfo.innerHTML = "";
    }
  });
});

const paymentLabels = {
  cod: "COD (Bayar di Tempat)",
  qris: "QRIS",
  dana: "DANA",
  bni: "BNI",
  seabank: "SeaBank",
  shopeepay: "ShopeePay",
};

const invoiceModal = document.getElementById("invoiceModal");
const orderListModal = document.getElementById("orderListModal");
const closeInvoice = document.getElementById("closeInvoice");
const closeOrderList = document.getElementById("closeOrderList");
const lihatDaftarPesanan = document.getElementById("lihatDaftarPesanan");
const cetakInvoiceBtn = document.getElementById("cetakInvoiceBtn");
const kembaliBerandaBtn = document.getElementById("kembaliBerandaBtn");

payNowBtn.onclick = () => {
  if (selectedPayment === "") {
    alert("Silakan pilih metode pembayaran terlebih dahulu.");
    return;
  }

  // Ambil snapshot keranjang sebelum direset
  const orderItems = JSON.parse(JSON.stringify(cart));

  const subtotal = orderItems.reduce((sum, item) => {
    const harga = Number(item.price.replace(/[^\d]/g, ""));
    return sum + harga * item.qty;
  }, 0);

  const ongkir = checkoutData.shippingCost || 0;
  const total = subtotal + ongkir;

  const noPesanan = "SP-" + Date.now();
  const tanggal = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  document.getElementById("invNomor").textContent = noPesanan;
  document.getElementById("invTanggal").textContent = tanggal;
  document.getElementById("invNama").textContent = checkoutData.nama;
  document.getElementById("invWA").textContent = checkoutData.telepon;
  document.getElementById("invAlamat").textContent = checkoutData.alamat;
  document.getElementById("invPengiriman").textContent =
    checkoutData.shippingLabel;
  document.getElementById("invPembayaran").textContent =
    paymentLabels[selectedPayment] || selectedPayment;

  lastOrder = { items: orderItems, subtotal, ongkir, total };

  // Tutup modal pembayaran, tampilkan invoice
  paymentModal.style.display = "none";
  invoiceModal.style.display = "flex";

  // Reset keranjang & state pembayaran
  cart = [];
  localStorage.removeItem("cart");
  updateCartCount();

  selectedPayment = "";
  document.querySelectorAll(".paymentOption").forEach((btn) => {
    btn.classList.remove("active");
  });
  paymentInfo.innerHTML = "";
};

// =======================
// Tutup Invoice / Daftar Pesanan
// =======================

closeInvoice.onclick = () => {
  invoiceModal.style.display = "none";
};

closeOrderList.onclick = () => {
  orderListModal.style.display = "none";
};

// =======================
// Lihat Daftar Pesanan
// =======================

lihatDaftarPesanan.onclick = () => {
  const orderListItems = document.getElementById("orderListItems");

  orderListItems.innerHTML = "";

  lastOrder.items.forEach((item) => {
    const harga = Number(item.price.replace(/[^\d]/g, ""));
    const itemTotal = harga * item.qty;

    const div = document.createElement("div");

    div.className = "order-item-row";

    div.innerHTML = `
      <div class="item-title-price">
        <span>${item.title}</span>
        <span>Rp${itemTotal.toLocaleString("id-ID")}</span>
      </div>
      <div class="item-qty">${item.qty} x ${item.price}</div>
    `;

    orderListItems.appendChild(div);
  });

  document.getElementById("invSubtotal").textContent =
    "Rp" + lastOrder.subtotal.toLocaleString("id-ID");
  document.getElementById("invOngkir").textContent =
    "Rp" + lastOrder.ongkir.toLocaleString("id-ID");
  document.getElementById("invGrandTotal").textContent =
    "Rp" + lastOrder.total.toLocaleString("id-ID");

  invoiceModal.style.display = "none";
  orderListModal.style.display = "flex";
};

// =======================
// Cetak Invoice
// =======================

cetakInvoiceBtn.onclick = () => {
  window.print();
};

// =======================
// Kembali ke Beranda
// =======================

kembaliBerandaBtn.onclick = () => {
  orderListModal.style.display = "none";

  document.getElementById("nama").value = "";
  document.getElementById("alamat").value = "";
  document.getElementById("telepon").value = "";
  document.getElementById("shippingMethod").value = "";

  window.scrollTo({ top: 0, behavior: "smooth" });
};

// =======================
// Klik di luar modal invoice/daftar pesanan
// =======================

window.addEventListener("click", (e) => {
  if (e.target === invoiceModal) {
    invoiceModal.style.display = "none";
  }

  if (e.target === orderListModal) {
    orderListModal.style.display = "none";
  }
});

// ===============================
// Login Admin & Dashboard
// ===============================

const adminBtn = document.getElementById("adminBtn");
const adminModal = document.getElementById("adminModal");
const closeAdmin = document.getElementById("closeAdmin");
const loginButton = document.getElementById("loginButton");

const adminDashboardModal = document.getElementById("adminDashboardModal");
const closeAdminDashboard = document.getElementById("closeAdminDashboard");
const adminProductList = document.getElementById("adminProductList");
const adminLogoutBtn = document.getElementById("adminLogoutBtn");
const adminWelcomeText = document.getElementById("adminWelcomeText");

// Kredensial admin (nama & kode)
const ADMIN_CREDENTIALS = {
  nama: "admin",
  password: "admin123",
};

adminBtn.addEventListener("click", (e) => {
  e.preventDefault();
  adminModal.style.display = "flex";
});

closeAdmin.onclick = () => {
  adminModal.style.display = "none";
};

loginButton.onclick = () => {
  const nama = document.getElementById("adminName").value.trim();
  const password = document.getElementById("adminPassword").value.trim();

  if (nama === "" || password === "") {
    alert("Masukkan nama dan kode admin.");
    return;
  }

  if (
    nama.toLowerCase() !== ADMIN_CREDENTIALS.nama ||
    password !== ADMIN_CREDENTIALS.password
  ) {
    alert("Nama atau kode admin salah.");
    return;
  }

  adminWelcomeText.textContent =
    "Halo, " + nama + "! Kelola produk di bawah ini.";

  document.getElementById("adminName").value = "";
  document.getElementById("adminPassword").value = "";

  adminModal.style.display = "none";

  renderAdminProducts();

  adminDashboardModal.style.display = "flex";
};

closeAdminDashboard.onclick = () => {
  adminDashboardModal.style.display = "none";
};

adminLogoutBtn.onclick = () => {
  adminDashboardModal.style.display = "none";
};

function renderAdminProducts() {
  adminProductList.innerHTML = "";

  Object.keys(productData).forEach((id) => {
    const product = productData[id];
    const hargaAngka = Number(product.price.replace(/[^\d]/g, ""));

    const row = document.createElement("div");
    row.className = "admin-product-row";
    row.dataset.id = id;

    row.innerHTML = `
      <img src="${product.image}" class="admin-product-img">
      <div class="admin-product-fields">
        <label>Nama Produk</label>
        <input type="text" class="admin-input admin-name" value="${product.title}">

        <label>Harga (Rp)</label>
        <input type="text" class="admin-input admin-price" value="${hargaAngka}">

        <label>Stok</label>
        <div class="admin-stock-control">
          <button class="stock-btn minus-stock" type="button">−</button>
          <span class="admin-stock-value">${product.stok}</span>
          <button class="stock-btn plus-stock" type="button">+</button>
        </div>

        <button class="admin-save-btn" type="button">💾 Simpan Perubahan</button>
      </div>
    `;

    adminProductList.appendChild(row);
  });

  // Tombol kurangi stok
  adminProductList.querySelectorAll(".minus-stock").forEach((btn) => {
    btn.onclick = () => {
      const row = btn.closest(".admin-product-row");
      const id = row.dataset.id;

      if (productData[id].stok > 0) {
        productData[id].stok--;
        row.querySelector(".admin-stock-value").textContent =
          productData[id].stok;
        saveProductData();
      }
    };
  });

  // Tombol tambah stok
  adminProductList.querySelectorAll(".plus-stock").forEach((btn) => {
    btn.onclick = () => {
      const row = btn.closest(".admin-product-row");
      const id = row.dataset.id;

      productData[id].stok++;
      row.querySelector(".admin-stock-value").textContent =
        productData[id].stok;
      saveProductData();
    };
  });

  // Tombol simpan nama & harga
  adminProductList.querySelectorAll(".admin-save-btn").forEach((btn) => {
    btn.onclick = () => {
      const row = btn.closest(".admin-product-row");
      const id = row.dataset.id;

      const newName = row.querySelector(".admin-name").value.trim();
      const newPriceRaw = row.querySelector(".admin-price").value.trim();
      const newPriceNumber = Number(newPriceRaw.replace(/[^\d]/g, ""));

      if (newName === "" || isNaN(newPriceNumber) || newPriceNumber <= 0) {
        alert("Nama dan harga harus diisi dengan benar.");
        return;
      }

      productData[id].title = newName;
      productData[id].price = "Rp" + newPriceNumber.toLocaleString("id-ID");

      saveProductData();
      alert("Produk berhasil diperbarui.");
    };
  });
}

window.addEventListener("click", (e) => {
  if (e.target === adminModal) {
    adminModal.style.display = "none";
  }

  if (e.target === adminDashboardModal) {
    adminDashboardModal.style.display = "none";
  }
});
