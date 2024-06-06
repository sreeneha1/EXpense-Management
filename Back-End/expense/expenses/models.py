from django.db import models

# Create your models here.
class expenses(models.Model):
    class category_choice(models.IntegerChoices):
            fundraising = 1 , "Fundraising"
            franchising = 2 , "franchising"
            insurance_sales = 3 , "Insurance Sales"
            financing_business = 4 , "Financing business"
            rental_and_leasing = 5 , "Rental and leasing"
            investments = 6 , "Investments"
            sale_of_advertising = 7 , "Sale of advertising"
            affiliate_marketing = 8 , "Affiliate Marketing"
            online_shop = 9 , "Online shop"
            lead_generation = 10, "Lead generation"
            freemium = 11 , "Freemium"
            Sale_of_hours = 12 , "Sale of hours"
            sale_of_services = 13 , "Sale of services"
            Sale_of_events = 14 , "Sale of events"
            license_or_member_fees = 15 , "License/Member fees"
            wholesale = 16 , "Wholesale"
            agent_representation = 17 , "Agent representation"
            retail = 18 , "Retail"
            consignment = 19 , "Consignment"
            subscriptions = 20 , "Subscriptions"
            handling_fees = 21 , "Handling fees"
            manufacturing = 22 , "Manufacturing"
            contract_manufacturing = 23 , "Contract Manufacturing"
            licenses_production = 24 , "Licenses Production"
            outsourcing = 25 , "Outsourcing"
            royalty = 26 , "Royalty" 


    description = models.CharField(max_length=250)
    category = models.IntegerField(choices=category_choice.choices)
    amount = models.IntegerField()
    created_at = models.DateField()