# Generated by Django 4.2.17 on 2025-01-03 09:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0004_variant_stock'),
    ]

    operations = [
        migrations.RenameField(
            model_name='variant',
            old_name='stock',
            new_name='stocks',
        ),
    ]
