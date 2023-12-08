from django.db import models

from users.models import CustomUser


# Create your models here.

class Message(models.Model):
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='receiver')
    message = models.TextField()
    send_date_time = models.DateTimeField(auto_now_add=True)


class Chat(models.Model):
    first_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='first_user')
    second_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='second_user')
    messages = models.ManyToManyField(Message)

    def get_chat_id(self):
        return f'{self.first_user.id}{self.second_user.id}'