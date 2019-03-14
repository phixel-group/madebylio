from django.contrib.auth.backends import ModelBackend
from .models import Usuario
from django.contrib.auth import get_user_model
from django.db.models import Q

class EmailAuthBackend(ModelBackend):
    """
    Email Authentication Backend

    Allows a user to sign in using an email/password pair, then check
    a username/password pair if email failed
    """

    def authenticate(self, username=None, password=None, **kwargs):
        UserModel = get_user_model()
        if username is None:
            username = kwargs.get(UserModel.USERNAME_FIELD)
        # `username` field does not restring using `@`, so technically email can be
        # as username and email, even with different users
        users = UserModel._default_manager.filter(
            Q(**{UserModel.USERNAME_FIELD: username}) | Q(email__iexact=username))
        # check for any password match
        for user in users:
            if user.check_password(password):
                return user
        if not users:
            # Run the default password hasher once to reduce the timing
            # difference between an existing and a non-existing user (#20760).
            UserModel().set_password(password)