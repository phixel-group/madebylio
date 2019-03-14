from django.db import models

# Create your models here.
from django.utils.text import slugify
# Create your models here.
class Postgallery(models.Model):
    title = models.CharField(max_length=128)
    body = models.CharField(max_length=400)
    def __str__(self):
        return "%s" % self.title

def get_image_filename(instance, filename):
    title = instance.post.title
    slug = slugify(title)
    return "post_images/%s-%s" % (slug, filename)


class Imagegallery(models.Model):
    post = models.ForeignKey(Postgallery, default=None,on_delete = models.CASCADE)
    image = models.ImageField(upload_to=get_image_filename,
                              verbose_name='Image')
    def __str__(self):
        return "%s" % self.image