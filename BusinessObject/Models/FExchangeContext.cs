using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace BusinessObject.Models
{
    public partial class FExchangeContext : DbContext
    {
        public FExchangeContext()
        {
        }

        public FExchangeContext(DbContextOptions<FExchangeContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Accounts { get; set; }
        public virtual DbSet<Admin> Admins { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<ExchangeDesire> ExchangeDesires { get; set; }
        public virtual DbSet<Notification> Notifications { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<Payment> Payments { get; set; }
        public virtual DbSet<ProductImage> ProductImages { get; set; }
        public virtual DbSet<ProductPost> ProductPosts { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<WishList> WishLists { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=tcp:yume.database.windows.net,1433;Initial Catalog=FExchange;Persist Security Info=False;User ID=yume;Password=PutinD@ide;MultipleActiveResultSets=True;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Account>(entity =>
            {
                entity.ToTable("Account");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Address).HasMaxLength(100);

                entity.Property(e => e.Avatar).HasMaxLength(300);

                entity.Property(e => e.FullName).HasMaxLength(150);

                entity.Property(e => e.Gmail)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Phone).HasMaxLength(50);

                entity.Property(e => e.Status).HasMaxLength(50);

                entity.HasOne(d => d.RoleNavigation)
                    .WithMany(p => p.Accounts)
                    .HasForeignKey(d => d.Role)
                    .HasConstraintName("FK_Account_Role");
            });

            modelBuilder.Entity<Admin>(entity =>
            {
                entity.ToTable("Admin");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Gmail)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .HasColumnName("password");

                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .HasColumnName("username");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("Category");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Category1)
                    .HasMaxLength(50)
                    .HasColumnName("Category");
            });

            modelBuilder.Entity<ExchangeDesire>(entity =>
            {
                entity.ToTable("Exchange_Desire");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CategoryId).HasColumnName("Category_ID");

                entity.Property(e => e.ProductId).HasColumnName("Product_ID");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.ExchangeDesires)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Exchange_Desire_Category");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ExchangeDesires)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Exchange_Desire_Product_Post");
            });

            modelBuilder.Entity<Notification>(entity =>
            {
                entity.ToTable("Notification");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AccountId).HasColumnName("Account_ID");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Subject).HasMaxLength(500);

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Notifications)
                    .HasForeignKey(d => d.AccountId)
                    .HasConstraintName("FK_Notification_Account");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.Notifications)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("FK_Notification_Order");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("Order");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.BuyerId).HasColumnName("Buyer_ID");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.FeedBack2).HasMaxLength(1000);

                entity.Property(e => e.Feedback).HasMaxLength(1000);

                entity.Property(e => e.Product2Id).HasColumnName("Product2_ID");

                entity.Property(e => e.ProductId).HasColumnName("Product_ID");

                entity.Property(e => e.Status).HasMaxLength(50);

                entity.HasOne(d => d.Buyer)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.BuyerId)
                    .HasConstraintName("FK_Order_Account");

                entity.HasOne(d => d.Product2)
                    .WithMany(p => p.OrderProduct2s)
                    .HasForeignKey(d => d.Product2Id)
                    .HasConstraintName("FK_Order_Product_Post1");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.OrderProducts)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Order_Product_Post");
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.ToTable("Payment");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.BeanAfter).HasColumnName("Bean_After");

                entity.Property(e => e.BeanBefore).HasColumnName("Bean_Before");

                entity.Property(e => e.OrderId).HasColumnName("Order_ID");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.Payments)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("FK_Payment_Order");
            });

            modelBuilder.Entity<ProductImage>(entity =>
            {
                entity.ToTable("Product_Image");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Image)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("image");

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductImages)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Product_Image_Product_Post");
            });

            modelBuilder.Entity<ProductPost>(entity =>
            {
                entity.ToTable("Product_Post");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AccountId).HasColumnName("Account_ID");

                entity.Property(e => e.BoughtDate).HasColumnType("date");

                entity.Property(e => e.CategoryId).HasColumnName("Category_ID");

                entity.Property(e => e.Description).HasMaxLength(1000);

                entity.Property(e => e.Img).HasMaxLength(1000);

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.Property(e => e.Status).HasMaxLength(50);

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.ProductPosts)
                    .HasForeignKey(d => d.AccountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Product_Post_Account");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.ProductPosts)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Product_Post_Category");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("Role");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Role1)
                    .HasMaxLength(50)
                    .HasColumnName("Role");
            });

            modelBuilder.Entity<WishList>(entity =>
            {
                entity.HasKey(e => new { e.ProductPostId, e.AccountId });

                entity.ToTable("WishList");

                entity.Property(e => e.ProductPostId).HasColumnName("ProductPostID");

                entity.Property(e => e.AccountId).HasColumnName("AccountID");

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.WishLists)
                    .HasForeignKey(d => d.AccountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_WishList_Account");

                entity.HasOne(d => d.ProductPost)
                    .WithMany(p => p.WishLists)
                    .HasForeignKey(d => d.ProductPostId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_WishList_Product_Post");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
