from fastapi import Header, HTTPException, status

def get_current_user_id(x_user_id: int = Header(default=None)) -> int:
    """
    Hardcore from header X-User-Id: <id>
    """
    if not x_user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing X-User-Id header"
        )
    return x_user_id