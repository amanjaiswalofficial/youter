import pytest

from app import app


@pytest.fixture(scope="module")
def test_client():
    """
    This will create a client for testing purpose
    :return:
    """
    testing_client = app.test_client()

    ctx = app.app_context()
    ctx.push()

    yield testing_client

    ctx.pop()